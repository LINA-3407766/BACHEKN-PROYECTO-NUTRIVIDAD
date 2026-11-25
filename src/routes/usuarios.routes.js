
const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuarios.controller');

// Registrar usuario
router.post('/', usuariosController.registrarUsuario);

// Consultar todos los usuarios
router.get('/', usuariosController.obtenerUsuarios);

// Consultar usuario por ID
router.get('/:id', usuariosController.obtenerUsuarioPorId);

// Actualizar usuario
router.put('/:id', usuariosController.actualizarUsuario);

// Eliminar usuario
router.delete('/:id', usuariosController.eliminarUsuario);

module.exports = router;
