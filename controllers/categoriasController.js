const { getConnection } = require('../conexion');

const obtenerCategoriasVista = async (req, res) => {
    try {
        const pool = await getConnection();
        const [categorias] = await pool.execute('SELECT * FROM inv_Categorias');
        res.render('categorias/index', { categorias });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const mostrarFormularioCategoria = (req, res) => {
    res.render('categorias/formulario', { titulo: 'Nueva Categoría', accion: '/categorias/nuevo', categoria: null });
};

const crearCategoria = async (req, res) => {
    const { Nombre, Descripcion } = req.body;
    try {
        const pool = await getConnection();
        await pool.execute(
            'INSERT INTO inv_Categorias (Nombre, Descripcion) VALUES (?, ?)', 
            [Nombre, Descripcion]
        );
        res.redirect('/categorias');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const eliminarCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.execute('DELETE FROM inv_Categorias WHERE Id_Categoria = ?', [id]);
        res.redirect('/categorias');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    obtenerCategoriasVista,
    mostrarFormularioCategoria,
    crearCategoria,
    eliminarCategoria
};