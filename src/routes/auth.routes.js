
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

// Iniciar sesión
router.post('/login', authController.iniciarSesion);

module.exports = router;
