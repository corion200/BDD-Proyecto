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

const mostrarFormularioEditarCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const [rows] = await pool.execute('SELECT * FROM inv_Categorias WHERE Id_Categoria = ?', [id]);
        
        if (rows.length === 0) return res.redirect('/categorias');
        
        res.render('categorias/formulario', { 
            titulo: 'Editar Categoría', 
            accion: `/categorias/editar/${id}?_method=PUT`, 
            categoria: rows[0] 
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Descripcion } = req.body;
    try {
        const pool = await getConnection();
        await pool.execute(
            'UPDATE inv_Categorias SET Nombre = ?, Descripcion = ? WHERE Id_Categoria = ?', 
            [Nombre, Descripcion, id]
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
    mostrarFormularioEditarCategoria,
    actualizarCategoria,
    eliminarCategoria
};