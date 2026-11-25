
const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// INICIAR SESIÓN
const iniciarSesion = async (correo, contrasena) => {

    const consulta = `
        SELECT id_usuario, nombres, apellidos, correo,
               contrasena, rol
        FROM usuarios
        WHERE correo = $1
    `;

    const resultado = await pool.query(consulta, [correo]);

    if (resultado.rows.length === 0) {
        return null;
    }

    const usuario = resultado.rows[0];

    const contrasenaCorrecta = await bcrypt.compare(
        contrasena,
        usuario.contrasena
    );

    if (!contrasenaCorrecta) {
        return null;
    }

    const token = jwt.sign(
        {
            id_usuario: usuario.id_usuario,
            correo: usuario.correo,
            rol: usuario.rol
        },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    return {
        id_usuario: usuario.id_usuario,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        correo: usuario.correo,
        rol: usuario.rol,
        token
    };
};

module.exports = {
    iniciarSesion
};
