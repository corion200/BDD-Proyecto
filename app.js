const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session'); // 1. Importar sesión

const { getConnection } = require('./conexion');

const app = express();

// Importar Rutas
const authRoutes = require('./routes/authRoutes');
const productosRoutes = require('./routes/productosRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const empleadosRoutes = require('./routes/empleadosRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');

// --- Configuraciones ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- Middlewares ---
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); // Para entender datos de formularios
app.use(express.json());
app.use(methodOverride('_method')); // Para usar PUT y DELETE en formularios

// 2. Configuración de Sesión
app.use(session({
    secret: 'agrovett123-secreto', // Clave para firmar la cookie
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // false para desarrollo (http)
        maxAge: 24 * 60 * 60 * 1000 // La sesión dura 24 horas
    }
}));

// 3. Middleware para pasar el usuario a todas las vistas (para mostrar correo en sidebar, etc.)
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Archivos estáticos (CSS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// --- Rutas ---

// Rutas de Autenticación (Login/Logout) - Públicas
app.use('/', authRoutes);

// Middleware de protección para las siguientes rutas
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

// Rutas Protegidas (Solo accesibles si hay sesión)
app.use('/productos', isAuthenticated, productosRoutes);
app.use('/clientes', isAuthenticated, clientesRoutes);
app.use('/empleados', isAuthenticated, empleadosRoutes);
app.use('/categorias', isAuthenticated, categoriasRoutes);

// Ruta raíz
app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/productos');
    } else {
        res.redirect('/login');
    }
});

// --- Iniciar Servidor ---
async function startServer() {
    try {
        await getConnection(); // Verifica conexión a BD al iniciar
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo, abrir en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error crítico al conectar a la BD:', error.message);
    }
}

startServer();