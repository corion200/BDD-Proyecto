const { getConnection, sql } = require('../conexion');

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
        const result = await pool.request()
            .input('correo', sql.VarChar, correo)
            .query('SELECT * FROM Inventario.Administrador WHERE Correo = @correo');

        if (result.recordset.length === 0) {
            return res.render('auth/login', { error: 'Usuario no encontrado' });
        }

        const admin = result.recordset[0];

        // Comparación simple (En producción usar bcrypt)
        if (contraseña === admin.Contraseña) {
            // Guardar usuario en sesión
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