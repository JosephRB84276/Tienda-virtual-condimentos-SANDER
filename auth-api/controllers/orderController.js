const Pedido = require('../models/Pedido');

exports.createOrder = async (req, res) => {
    try {
    console.log('Recibiendo pedido:', req.body); // DEBUG
    
    const { usuario, items, total } = req.body;

    if (!usuario || !items || !total) {
        console.log('❌ Faltan datos:', { usuario, items, total });
        return res.status(400).json({ mensaje: "Error: Faltan datos para procesar el pedido." });
    }

    const nuevoPedido = await Pedido.create({ 
        usuario, 
        items, 
        total, 
        estado: 'Pagado' 
    });

    console.log('Pedido creado:', nuevoPedido); // DEBUG

    return res.status(201).json({ 
        mensaje: "Compra realizada exitosamente",
        pedido: nuevoPedido
    });

    } catch (error) {
    console.error('ERROR EN BACKEND:', error.message);
    console.error('Stack:', error.stack);
    return res.status(500).json({ mensaje: "Error interno al procesar el pedido." });
    }
};

exports.getOrdersByUser = async (req, res) => {
    try {
    const pedidos = await Pedido.getByUser(req.params.usuario);
    return res.status(200).json({ data: pedidos });
    } catch (error) {
    console.error('❌ Error en getOrdersByUser:', error);
    return res.status(500).json({ mensaje: "Error al obtener el historial." });
    }
};