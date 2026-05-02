const sql = require('mssql');

const config = {
    user: 'api_user',
    password: 'TuPassword123',
    server: 'localhost',
    port: 1433,
    database: 'Centro_Agricola_Veterinario',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

let pool;

async function getConnection() {
    try {
        if (pool) return pool;
        pool = await sql.connect(config);
        console.log('Conexión a la base de datos establecida');
        return pool;
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        throw error;
    }
}

module.exports = {
    getConnection,
    sql
};