const pool = require('./database');

async function probarConexion() {
    try {
        const resultado = await pool.query(
            'SELECT current_database() AS nombre'
        );

        console.log('¡Conexión exitosa!');
        console.log('Base de datos:', resultado.rows[0].nombre);

    } catch (error) {
        console.error('Error de conexión:', error.message);
    } finally {
        await pool.end();
    }
}

probarConexion();