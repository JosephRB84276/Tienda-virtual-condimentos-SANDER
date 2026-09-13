const Producto = require('../models/Productos');

//Obtener todos los productos (AHORA ASÍNCRONO)
exports.getProducts = async (req, res) => {
  try {
    const productos = await Producto.getAll();
    res.status(200).json({
      mensaje: "Consulta exitosa desde MySQL",
      data: productos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al consultar la base de datos." });
  }
};

//Obtener producto por ID
exports.getProductById = async (req, res) => {
  try {
    const producto = await Producto.getById(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }

    res.status(200).json({ data: producto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error interno." });
  }
};