const express = require('express');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');

const { getConnection } = require('./conexion');

const app = express();

const authRoutes = require('./routes/authRoutes');
const productosRoutes = require('./routes/productosRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const empleadosRoutes = require('./routes/empleadosRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'agrovett123-secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRoutes);

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

app.use('/productos', isAuthenticated, productosRoutes);
app.use('/clientes', isAuthenticated, clientesRoutes);
app.use('/empleados', isAuthenticated, empleadosRoutes);
app.use('/categorias', isAuthenticated, categoriasRoutes);

app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/productos');
    } else {
        res.redirect('/login');
    }
});

async function startServer() {
    try {
        await getConnection();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo, abrir en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error crítico al conectar a la BD:', error.message);
    }
}

startServer();