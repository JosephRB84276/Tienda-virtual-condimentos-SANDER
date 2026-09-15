
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes'); 
const orderRoutes = require('./routes/orderRoutes');     

const app = express();
const PORT = process.env.PORT || 3000;

//Funciones que procesan las petición
app.use(cors());                // Habilita peticiones desde otros orígenes 
app.use(express.json());        // Permite leer cuerpos JSON en req.body 

//Todas las peticiones que empiecen con /api/auth se envían a authRoutes.js
app.use('/api/auth', authRoutes);
app.use('/api/productos', productRoutes); 
app.use('/api/pedidos', orderRoutes);     

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: 'API condimentos SANDER activa' });
});

const db = require('./config/db');
db.query('SELECT 1 + 1 AS solution')
    .then(([rows]) => console.log('✅ Conexión a MySQL exitosa:', rows[0].solution))
    .catch(err => console.error('❌ Error conectando a MySQL:', err));

//El servidor queda a la espera de peticiones en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});