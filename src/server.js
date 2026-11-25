
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const usuariosRoutes = require('./routes/usuarios.routes');
const authRoutes = require('./routes/auth.routes');
const consultasRoutes = require('./routes/consultas.routes');

const app = express();

// CONFIGURACIONES
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// RUTA PRINCIPAL
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de NutriVida funcionando correctamente',
        version: '1.0.0'
    });
});

// RUTA DE SALUD
app.get('/api/health', (req, res) => {
    res.json({
        estado: 'activo',
        mensaje: 'Servidor NutriVida funcionando'
    });
});

// RUTAS DE USUARIOS
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/consultas', consultasRoutes);

// RUTA NO ENCONTRADA
app.use((req, res) => {
    res.status(404).json({
        mensaje: 'Ruta no encontrada'
    });
});

// INICIAR SERVIDOR
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor NutriVida ejecutándose en el puerto ${PORT}`);
});
