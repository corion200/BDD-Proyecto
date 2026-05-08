const mysql = require('mysql2/promise');

const config = {
    host: 'localhost',
    user: 'root',            
    password: '',            
    database: 'Centro_Agricola_Veterinario',
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
};

let pool;

async function getConnection() {
    try {
        // En mysql2, el pool se crea de una sola vez y se reutiliza
        if (!pool) {
            pool = mysql.createPool(config);
            console.log('Pool de conexiones a MySQL creado');
        }
        
        // Devolvemos el pool directamente. 
        // Nota: En mysql2 usas pool.execute() en lugar de pool.request()
        return pool;
    } catch (error) {
        console.error('Error al crear el pool de conexiones:', error);
        throw error;
    }
}

module.exports = {
    getConnection,
    mysql
};