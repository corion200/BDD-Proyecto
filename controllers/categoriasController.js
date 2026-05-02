const { getConnection, sql } = require('../conexion');

const obtenerCategoriasVista = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Inventario.Categorias');
        res.render('categorias/index', { categorias: result.recordset });
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
        await pool.request()
            .input('Nombre', sql.VarChar, Nombre)
            .input('Descripcion', sql.VarChar, Descripcion)
            .query('INSERT INTO Inventario.Categorias (Nombre, Descripcion) VALUES (@Nombre, @Descripcion)');
        res.redirect('/categorias');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const eliminarCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Inventario.Categorias WHERE Id_Categoria = @id');
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