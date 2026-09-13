const db = require('../config/db');

module.exports = {
  // Buscar usuario por número de documento
  findByDocument: async (docNumber) => {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE numero_documento = ?', [docNumber]);
    return rows.length > 0 ? rows[0] : null;
  },

  // Crear nuevo usuario en MySQL
  create: async (userData) => {
    const sql = `INSERT INTO usuarios 
      (nombre, apellido, email, telefono, direccion, tipo_documento, numero_documento, password) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [
      userData.nombre,
      userData.apellido,
      userData.email,
      userData.telefono,
      userData.direccion,
      userData.tipoDocumento,
      userData.numeroDocumento,
      userData.password
    ];

    const [result] = await db.query(sql, values);
    return { id: result.insertId, ...userData };
  },

  // Obtener todos (solo para pruebas, oculta contraseña)
  getAll: async () => {
    const [rows] = await db.query('SELECT id, nombre, apellido, email, numero_documento FROM usuarios');
    return rows;
  }
};