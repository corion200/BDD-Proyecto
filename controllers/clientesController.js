const { getConnection } = require('../conexion');

const obtenerClientesVista = async (req, res) => {
    try {
        const pool = await getConnection();
        const [clientes] = await pool.execute('SELECT * FROM vta_Clientes');
        res.render('clientes/index', { clientes });
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
        const duiValue = Dui && Dui.trim() !== '' ? Dui : null;

        await pool.execute(
            'INSERT INTO vta_Clientes (Nombre, Apellido, Dui, Correo, Telefono) VALUES (?, ?, ?, ?, ?)', 
            [Nombre, Apellido, duiValue, Correo, Telefono]
        );
        
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const mostrarFormularioEditarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const [rows] = await pool.execute('SELECT * FROM vta_Clientes WHERE Id_Cliente = ?', [id]);
        
        if (rows.length === 0) return res.redirect('/clientes');
        
        res.render('clientes/formulario', { 
            titulo: 'Editar Cliente', 
            accion: `/clientes/editar/${id}?_method=PUT`, 
            cliente: rows[0] 
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

        await pool.execute(
            'UPDATE vta_Clientes SET Nombre = ?, Apellido = ?, Dui = ?, Correo = ?, Telefono = ? WHERE Id_Cliente = ?', 
            [Nombre, Apellido, duiValue, Correo, Telefono, id]
        );
        
        res.redirect('/clientes');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const eliminarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.execute('DELETE FROM vta_Clientes WHERE Id_Cliente = ?', [id]);
        
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