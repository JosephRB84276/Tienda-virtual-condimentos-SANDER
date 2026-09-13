const db = require('../config/db');

module.exports = {
  // Obtener todos los productos desde MySQL
  getAll: async () => {
    // Ejecutamos la consulta SQL
    const [rows] = await db.query('SELECT * FROM productos');
    
    // Mapeamos los datos para que coincidan con lo que espera el Frontend
    // (En la BD se llama 'opciones', en el front 'options')
    return rows.map(p => ({
      id: p.id,
      name: p.nombre,
      category: p.categoria,
      image: p.imagen,
      options: typeof p.opciones === 'string' ? JSON.parse(p.opciones) : p.opciones
    }));
  },

  // Obtener un producto por ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [id]);
    
    if (rows.length === 0) return null;

    const p = rows[0];
    return {
      id: p.id,
      name: p.nombre,
      category: p.categoria,
      image: p.imagen,
      options: typeof p.opciones === 'string' ? JSON.parse(p.opciones) : p.opciones
    };
  }
};