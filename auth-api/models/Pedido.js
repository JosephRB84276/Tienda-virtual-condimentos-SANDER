const db = require('../config/db');

module.exports = {
  create: async (pedidoData) => {
    const itemsJson = JSON.stringify(pedidoData.items);
    
    // ✅ QUITAMOS 'fecha' del INSERT para que MySQL la genere automáticamente
    const sql = `INSERT INTO pedidos (usuario, items, total, estado) VALUES (?, ?, ?, ?)`;
    const values = [
      pedidoData.usuario,
      itemsJson,
      pedidoData.total,
      pedidoData.estado || 'Pagado'
    ];

    console.log(' Ejecutando SQL:', sql);
    console.log('🔍 Valores:', values);

    const [result] = await db.query(sql, values);
    
    // Obtenemos el pedido recién creado para devolverlo completo
    const [nuevoPedido] = await db.query('SELECT * FROM pedidos WHERE id = ?', [result.insertId]);
    
    const pedido = nuevoPedido[0];
    
    return {
        id: pedido.id,
        usuario: pedido.usuario,
        fecha: pedido.fecha, 
        items: pedidoData.items,
        total: pedido.total,
        estado: pedido.estado
    };
    },

    getByUser: async (usuario) => {
    const [rows] = await db.query('SELECT * FROM pedidos WHERE usuario = ? ORDER BY fecha DESC', [usuario]);
    
    return rows.map(p => ({
        ...p,
        items: typeof p.items === 'string' ? JSON.parse(p.items) : p.items
    }));
    }
};