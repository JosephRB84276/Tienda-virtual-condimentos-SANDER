const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// POST /api/pedidos (Crear orden)
router.post('/', orderController.createOrder);

module.exports = router;