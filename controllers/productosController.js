const { getConnection } = require('../conexion');

const obtenerProductosVista = async (req, res) => {
    try {
        const pool = await getConnection();
        const [productos] = await pool.execute('SELECT * FROM inv_Productos');
        res.render('productos/index', { productos });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const mostrarFormularioCrear = (req, res) => {
    res.render('productos/formulario', { titulo: 'Nuevo Producto', accion: '/productos/nuevo', producto: null });
};

const crearProductoVista = async (req, res) => {
    const { Precio_Uni, Stock, Nombre, Fecha_Vencimiento } = req.body;
    try {
        const pool = await getConnection();
        await pool.execute(
            'INSERT INTO inv_Productos (Precio_Uni, Stock, Nombre, Fecha_Vencimiento) VALUES (?, ?, ?, ?)', 
            [Precio_Uni, Stock, Nombre, Fecha_Vencimiento]
        );
        
        res.redirect('/productos');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const mostrarFormularioEditar = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const [rows] = await pool.execute('SELECT * FROM inv_Productos WHERE Id_Producto = ?', [id]);
        
        if (rows.length === 0) return res.redirect('/productos');
        
        res.render('productos/formulario', { 
            titulo: 'Editar Producto', 
            accion: `/productos/editar/${id}?_method=PUT`, 
            producto: rows[0] 
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const actualizarProductoVista = async (req, res) => {
    const { id } = req.params;
    const { Precio_Uni, Stock, Nombre, Fecha_Vencimiento } = req.body;
    try {
        const pool = await getConnection();
        await pool.execute(
            'UPDATE inv_Productos SET Precio_Uni = ?, Stock = ?, Nombre = ?, Fecha_Vencimiento = ? WHERE Id_Producto = ?', 
            [Precio_Uni, Stock, Nombre, Fecha_Vencimiento, id]
        );
        
        res.redirect('/productos');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const eliminarProductoVista = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.execute('DELETE FROM inv_Productos WHERE Id_Producto = ?', [id]);
        
        res.redirect('/productos');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    obtenerProductosVista,
    mostrarFormularioCrear,
    crearProductoVista,
    mostrarFormularioEditar,
    actualizarProductoVista,
    eliminarProductoVista
};