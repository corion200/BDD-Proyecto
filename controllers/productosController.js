const { getConnection, sql } = require('../conexion');

// Mostrar lista de productos
const obtenerProductosVista = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Inventario.Productos');
        res.render('productos/index', { productos: result.recordset });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Mostrar formulario para crear
const mostrarFormularioCrear = (req, res) => {
    res.render('productos/formulario', { titulo: 'Nuevo Producto', accion: '/productos/nuevo', producto: null });
};

// Crear producto (INSERT)
const crearProductoVista = async (req, res) => {
    const { Precio_Uni, Stock, Nombre, Fecha_Vencimiento } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Precio_Uni', sql.Float, Precio_Uni)
            .input('Stock', sql.Int, Stock)
            .input('Nombre', sql.VarChar, Nombre)
            .input('Fecha_Vencimiento', sql.Date, Fecha_Vencimiento)
            .query('INSERT INTO Inventario.Productos (Precio_Uni, Stock, Nombre, Fecha_Vencimiento) VALUES (@Precio_Uni, @Stock, @Nombre, @Fecha_Vencimiento)');
        
        res.redirect('/productos');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Mostrar formulario para editar
const mostrarFormularioEditar = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Inventario.Productos WHERE Id_Producto = @id');
        
        if (result.recordset.length === 0) return res.redirect('/productos');
        
        res.render('productos/formulario', { 
            titulo: 'Editar Producto', 
            accion: `/productos/editar/${id}?_method=PUT`, 
            producto: result.recordset[0] 
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Actualizar producto (UPDATE)
const actualizarProductoVista = async (req, res) => {
    const { id } = req.params;
    const { Precio_Uni, Stock, Nombre, Fecha_Vencimiento } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('Precio_Uni', sql.Float, Precio_Uni)
            .input('Stock', sql.Int, Stock)
            .input('Nombre', sql.VarChar, Nombre)
            .input('Fecha_Vencimiento', sql.Date, Fecha_Vencimiento)
            .query('UPDATE Inventario.Productos SET Precio_Uni = @Precio_Uni, Stock = @Stock, Nombre = @Nombre, Fecha_Vencimiento = @Fecha_Vencimiento WHERE Id_Producto = @id');
        
        res.redirect('/productos');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Eliminar producto (DELETE)
const eliminarProductoVista = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Inventario.Productos WHERE Id_Producto = @id');
        
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