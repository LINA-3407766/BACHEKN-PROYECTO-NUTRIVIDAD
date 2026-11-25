
const authService = require('../services/auth.service');

// INICIAR SESIÓN
const iniciarSesion = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({
                mensaje: 'El correo y la contraseña son obligatorios'
            });
        }

        const usuario = await authService.iniciarSesion(
            correo,
            contrasena
        );

        if (!usuario) {
            return res.status(401).json({
                mensaje: 'Correo o contraseña incorrectos'
            });
        }

        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            datos: usuario
        });

    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);

        return res.status(500).json({
            mensaje: 'Error al iniciar sesión'
        });
    }
};

module.exports = {
    iniciarSesion
};
