const { getConnection } = require('../conexion');

const mostrarLogin = (req, res) => {
    if (req.session.user) {
        return res.redirect('/productos');
    }
    res.render('auth/login', { error: null });
};

const iniciarSesion = async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const pool = await getConnection();
        const [rows] = await pool.execute('SELECT * FROM inv_Administrador WHERE Correo = ?', [correo]);

        if (rows.length === 0) {
            return res.render('auth/login', { error: 'Usuario no encontrado' });
        }

        const admin = rows[0];

        if (contraseña === admin.Contrasena) {
            req.session.user = {
                id: admin.Id_Administrador,
                correo: admin.Correo
            };
            return res.redirect('/productos');
        } else {
            return res.render('auth/login', { error: 'Contraseña incorrecta' });
        }
    } catch (error) {
        console.error(error);
        res.render('auth/login', { error: 'Error en el servidor' });
    }
};

const cerrarSesion = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};

module.exports = {
    mostrarLogin,
    iniciarSesion,
    cerrarSesion
};