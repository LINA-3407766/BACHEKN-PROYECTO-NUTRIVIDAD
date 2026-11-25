
const usuariosService = require('../services/usuarios.service');

// REGISTRAR USUARIO
const registrarUsuario = async (req, res) => {
    try {
        const { nombres, apellidos, correo, contrasena, fecha_nacimiento } = req.body;

        if (!nombres || !apellidos || !correo || !contrasena) {
            return res.status(400).json({
                mensaje: 'Todos los campos obligatorios deben estar completos'
            });
        }

        // El rol inicial siempre será usuario.
        const usuario = await usuariosService.registrarUsuario({
            nombres,
            apellidos,
            correo,
            contrasena,
            fecha_nacimiento,
            rol: 'usuario'
        });

        return res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            datos: usuario
        });

    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                mensaje: 'El correo electrónico ya está registrado'
            });
        }

        console.error('Error al registrar usuario:', error.message);

        return res.status(500).json({
            mensaje: 'Error al registrar el usuario'
        });
    }
};

// CONSULTAR TODOS LOS USUARIOS
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosService.obtenerUsuarios();

        return res.status(200).json({
            mensaje: 'Usuarios consultados correctamente',
            datos: usuarios
        });

    } catch (error) {
        console.error('Error al consultar usuarios:', error.message);

        return res.status(500).json({
            mensaje: 'Error al consultar los usuarios'
        });
    }
};

// CONSULTAR USUARIO POR ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'El ID del usuario no es válido'
            });
        }

        const usuario = await usuariosService.obtenerUsuarioPorId(id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        return res.status(200).json({
            mensaje: 'Usuario encontrado',
            datos: usuario
        });

    } catch (error) {
        console.error('Error al buscar usuario:', error.message);

        return res.status(500).json({
            mensaje: 'Error al consultar el usuario'
        });
    }
};

// ACTUALIZAR USUARIO
const actualizarUsuario = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'El ID del usuario no es válido'
            });
        }

        const { nombres, apellidos, correo, contrasena, fecha_nacimiento } = req.body;

        if (!nombres || !apellidos || !correo) {
            return res.status(400).json({
                mensaje: 'Nombres, apellidos y correo son obligatorios'
            });
        }

        const usuario = await usuariosService.actualizarUsuario(id, {
            nombres,
            apellidos,
            correo,
            contrasena,
            fecha_nacimiento
        });

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        return res.status(200).json({
            mensaje: 'Usuario actualizado correctamente',
            datos: usuario
        });

    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                mensaje: 'El correo electrónico ya está registrado'
            });
        }

        console.error('Error al actualizar usuario:', error.message);

        return res.status(500).json({
            mensaje: 'Error al actualizar el usuario'
        });
    }
};

// ELIMINAR USUARIO
const eliminarUsuario = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'El ID del usuario no es válido'
            });
        }

        const usuario = await usuariosService.eliminarUsuario(id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        return res.status(200).json({
            mensaje: 'Usuario eliminado correctamente'
        });

    } catch (error) {
        console.error('Error al eliminar usuario:', error.message);

        if (error.code === '23503') {
            return res.status(409).json({
                mensaje: 'No se puede eliminar el usuario porque tiene registros relacionados'
            });
        }

        return res.status(500).json({
            mensaje: 'Error al eliminar el usuario'
        });
    }
};

module.exports = {
    registrarUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};
