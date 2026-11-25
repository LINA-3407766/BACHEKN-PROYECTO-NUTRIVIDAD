
const express = require('express');
const router = express.Router();

const consultasController = require('../controllers/consultas.controller');

// CONSULTA 1: HISTORIAL DE ALIMENTACIÓN
router.get('/historial', consultasController.obtenerHistorialAlimentacion);

// CONSULTA 2: RESUMEN NUTRICIONAL
router.get('/resumen', consultasController.obtenerResumenNutricional);

module.exports = router;
