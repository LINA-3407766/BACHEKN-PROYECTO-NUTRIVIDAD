
const consultasService = require('../services/consultas.service');

// CONSULTA 1: HISTORIAL DE ALIMENTACIÓN
const obtenerHistorialAlimentacion = async (req, res) => {
    try {
        const historial = await consultasService.obtenerHistorialAlimentacion();

        return res.status(200).json({
            mensaje: 'Historial de alimentación consultado correctamente',
            datos: historial
        });

    } catch (error) {
        console.error('Error al consultar el historial:', error.message);

        return res.status(500).json({
            mensaje: 'Error al consultar el historial de alimentación'
        });
    }
};

// CONSULTA 2: RESUMEN NUTRICIONAL
const obtenerResumenNutricional = async (req, res) => {
    try {
        const resumen = await consultasService.obtenerResumenNutricional();

        return res.status(200).json({
            mensaje: 'Resumen nutricional consultado correctamente',
            datos: resumen
        });

    } catch (error) {
        console.error('Error al consultar el resumen:', error.message);

        return res.status(500).json({
            mensaje: 'Error al consultar el resumen nutricional'
        });
    }
};

module.exports = {
    obtenerHistorialAlimentacion,
    obtenerResumenNutricional
};
