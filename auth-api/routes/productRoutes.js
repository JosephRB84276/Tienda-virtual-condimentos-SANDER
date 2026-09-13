const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/productos
router.get('/', productController.getProducts);

// GET /api/productos/:id
router.get('/:id', productController.getProductById);

module.exports = router;