const { getConnection, sql } = require('../conexion');

const obtenerClientesVista = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Ventas.Cliente');
        res.render('clientes/index', { clientes: result.recordset });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const mostrarFormularioCliente = (req, res) => {
    res.render('clientes/formulario', { titulo: 'Nuevo Cliente', accion: '/clientes/nuevo', cliente: null });
};

const crearCliente = async (req, res) => {
    const { Nombre, Apellido, Dui, Correo, Telefono } = req.body;
    try {
        const pool = await getConnection();
        // DUI puede ser NULL, asi que validamos si viene vacío
        const duiValue = Dui && Dui.trim() !== '' ? Dui : null;

        await pool.request()
            .input('Nombre', sql.VarChar, Nombre)
            .input('Apellido', sql.VarChar, Apellido)
            .input('Dui', sql.Char, duiValue)
            .input('Correo', sql.VarChar, Correo)
            .input('Telefono', sql.VarChar, Telefono)
            .query('INSERT INTO Ventas.Cliente (Nombre, Apellido, Dui, Correo, Telefono) VALUES (@Nombre, @Apellido, @Dui, @Correo, @Telefono)');
        
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const mostrarFormularioEditarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Ventas.Cliente WHERE Id_Cliente = @id');
        
        if (result.recordset.length === 0) return res.redirect('/clientes');
        
        res.render('clientes/formulario', { 
            titulo: 'Editar Cliente', 
            accion: `/clientes/editar/${id}?_method=PUT`, 
            cliente: result.recordset[0] 
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const actualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Apellido, Dui, Correo, Telefono } = req.body;
    try {
        const pool = await getConnection();
        const duiValue = Dui && Dui.trim() !== '' ? Dui : null;

        await pool.request()
            .input('id', sql.Int, id)
            .input('Nombre', sql.VarChar, Nombre)
            .input('Apellido', sql.VarChar, Apellido)
            .input('Dui', sql.Char, duiValue)
            .input('Correo', sql.VarChar, Correo)
            .input('Telefono', sql.VarChar, Telefono)
            .query('UPDATE Ventas.Cliente SET Nombre = @Nombre, Apellido = @Apellido, Dui = @Dui, Correo = @Correo, Telefono = @Telefono WHERE Id_Cliente = @id');
        
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const eliminarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Ventas.Cliente WHERE Id_Cliente = @id');
        
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    obtenerClientesVista,
    mostrarFormularioCliente,
    crearCliente,
    mostrarFormularioEditarCliente,
    actualizarCliente,
    eliminarCliente
};