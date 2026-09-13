const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

//REGISTRO
exports.register = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion, tipoDocumento, numeroDocumento, password } = req.body;

    if (!numeroDocumento || !password || !nombre || !email) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios." });
    }

    // Verificar si ya existe en MySQL
    const existingUser = await Usuario.findByDocument(numeroDocumento);
    if (existingUser) {
      return res.status(400).json({ mensaje: "Este documento ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoUsuario = {
      nombre, apellido, email, telefono, direccion,
      tipoDocumento, numeroDocumento, password: hashedPassword
    };

    await Usuario.create(nuevoUsuario);
    return res.status(201).json({ mensaje: "Registro exitoso en MySQL." });

  } catch (error) {
    console.error(' Error en register:', error);
    return res.status(500).json({ mensaje: "Error interno del servidor." });
  }
};

//LOGIN
exports.login = async (req, res) => {
  try {
    const { usuario, password } = req.body; // 'usuario' viene del frontend como numeroDocumento

    if (!usuario || !password) {
      return res.status(400).json({ mensaje: "Faltan credenciales." });
    }

    const user = await Usuario.findByDocument(usuario);
    if (!user) {
      return res.status(401).json({ mensaje: "Usuario no encontrado." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta." });
    }

    return res.status(200).json({ 
      mensaje: "Autenticación satisfactoria", 
      usuario: user.nombre,
      numeroDocumento: user.numero_documento
    });

  } catch (error) {
    console.error('❌ Error en login:', error);
    return res.status(500).json({ mensaje: "Error interno." });
  }
};