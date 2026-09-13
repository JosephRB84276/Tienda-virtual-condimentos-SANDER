// auth-api/config/db.js
const mysql = require('mysql2');

// Crear el Pool de conexiones
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',          
    password: 'IvanRB84276',          
    database: 'sander_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Promisificar el pool para usar async/await
const promisePool = pool.promise();

module.exports = promisePool;