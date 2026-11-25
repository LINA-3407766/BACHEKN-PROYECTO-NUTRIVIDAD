
const pool = require('../config/database');
const bcrypt = require('bcryptjs');

// REGISTRAR USUARIO
const registrarUsuario = async (datos) => {
    const {
        nombres,
        apellidos,
        correo,
        contrasena,
        fecha_nacimiento,
        rol
    } = datos;

    const contrasenaHash = await bcrypt.hash(contrasena, 10);

    const consulta = `
        INSERT INTO usuarios
        (nombres, apellidos, correo, contrasena, fecha_nacimiento, rol)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id_usuario, nombres, apellidos, correo, fecha_nacimiento, rol
    `;

    const valores = [
        nombres,
        apellidos,
        correo,
        contrasenaHash,
        fecha_nacimiento || null,
        rol || 'usuario'
    ];

    const resultado = await pool.query(consulta, valores);
    return resultado.rows[0];
};

// CONSULTAR TODOS LOS USUARIOS
const obtenerUsuarios = async () => {
    const consulta = `
        SELECT id_usuario, nombres, apellidos, correo,
               fecha_nacimiento, rol, fecha_registro
        FROM usuarios
        ORDER BY id_usuario
    `;

    const resultado = await pool.query(consulta);
    return resultado.rows;
};

// CONSULTAR USUARIO POR ID
const obtenerUsuarioPorId = async (id) => {
    const consulta = `
        SELECT id_usuario, nombres, apellidos, correo,
               fecha_nacimiento, rol, fecha_registro
        FROM usuarios
        WHERE id_usuario = $1
    `;

    const resultado = await pool.query(consulta, [id]);
    return resultado.rows[0];
};

// ACTUALIZAR USUARIO
const actualizarUsuario = async (id, datos) => {
    const {
        nombres,
        apellidos,
        correo,
        contrasena,
        fecha_nacimiento,
        rol
    } = datos;

    let consulta;
    let valores;

    if (contrasena) {
        const contrasenaHash = await bcrypt.hash(contrasena, 10);

        consulta = `
            UPDATE usuarios
            SET nombres = $1,
                apellidos = $2,
                correo = $3,
                contrasena = $4,
                fecha_nacimiento = $5,
                rol = $6
            WHERE id_usuario = $7
            RETURNING id_usuario, nombres, apellidos, correo,
                      fecha_nacimiento, rol
        `;

        valores = [
            nombres, apellidos, correo, contrasenaHash,
            fecha_nacimiento || null, rol || 'usuario', id
        ];
    } else {
        consulta = `
            UPDATE usuarios
            SET nombres = $1,
                apellidos = $2,
                correo = $3,
                fecha_nacimiento = $4,
                rol = $5
            WHERE id_usuario = $6
            RETURNING id_usuario, nombres, apellidos, correo,
                      fecha_nacimiento, rol
        `;

        valores = [
            nombres, apellidos, correo,
            fecha_nacimiento || null, rol || 'usuario', id
        ];
    }

    const resultado = await pool.query(consulta, valores);
    return resultado.rows[0];
};

// ELIMINAR USUARIO
const eliminarUsuario = async (id) => {
    const consulta = `
        DELETE FROM usuarios
        WHERE id_usuario = $1
        RETURNING id_usuario
    `;

    const resultado = await pool.query(consulta, [id]);
    return resultado.rows[0];
};

module.exports = {
    registrarUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};
