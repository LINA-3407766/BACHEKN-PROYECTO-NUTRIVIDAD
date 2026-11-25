
const pool = require('../config/database');

// CONSULTA 1: HISTORIAL DE ALIMENTACIÓN
const obtenerHistorialAlimentacion = async () => {
    const consulta = `
        SELECT
            u.id_usuario,
            u.nombres,
            u.apellidos,
            a.nombre AS alimento,
            c.nombre AS categoria,
            rc.cantidad,
            rc.fecha_consumo,
            rc.momento_comida,
            a.calorias
        FROM registro_comida rc
        INNER JOIN usuarios u
            ON rc.id_usuario = u.id_usuario
        INNER JOIN alimento a
            ON rc.id_alimento = a.id_alimento
        INNER JOIN categoria_alimento c
            ON a.id_categoria = c.id_categoria
        ORDER BY rc.fecha_consumo DESC;
    `;

    const resultado = await pool.query(consulta);
    return resultado.rows;
};

// CONSULTA 2: RESUMEN NUTRICIONAL POR USUARIO
const obtenerResumenNutricional = async () => {
    const consulta = `
        SELECT
            u.id_usuario,
            u.nombres,
            u.apellidos,
            SUM(rc.cantidad * a.calorias) AS total_calorias,
            SUM(rc.cantidad * a.proteinas) AS total_proteinas,
            SUM(rc.cantidad * a.carbohidratos) AS total_carbohidratos,
            SUM(rc.cantidad * a.grasas) AS total_grasas
        FROM usuarios u
        INNER JOIN registro_comida rc
            ON u.id_usuario = rc.id_usuario
        INNER JOIN alimento a
            ON rc.id_alimento = a.id_alimento
        GROUP BY
            u.id_usuario,
            u.nombres,
            u.apellidos
        ORDER BY u.id_usuario;
    `;

    const resultado = await pool.query(consulta);
    return resultado.rows;
};

module.exports = {
    obtenerHistorialAlimentacion,
    obtenerResumenNutricional
};
