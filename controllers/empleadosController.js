const { getConnection } = require('../conexion');

const obtenerEmpleadosVista = async (req, res) => {
    try {
        const pool = await getConnection();
        const [empleados] = await pool.execute(`
            SELECT e.*, a.Correo as CorreoAdmin 
            FROM inv_Empleados e 
            LEFT JOIN inv_Administrador a ON e.Id_Administrador1 = a.Id_Administrador
        `);
        res.render('empleados/index', { empleados });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const mostrarFormularioEmpleado = async (req, res) => {
    try {
        const pool = await getConnection();
        const [administradores] = await pool.execute('SELECT * FROM inv_Administrador');
        res.render('empleados/formulario', { 
            titulo: 'Nuevo Empleado', 
            accion: '/empleados/nuevo', 
            empleado: null,
            administradores 
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const crearEmpleado = async (req, res) => {
    const { Nombre, Apellido, Dui, Sueldo, Telefono, Nivel_Academico, Id_Administrador1 } = req.body;
    
    // Validación de sueldo
    if (parseFloat(Sueldo) <= 0) {
        return res.status(400).send('El sueldo debe ser un número mayor a 0');
    }

    try {
        const pool = await getConnection();
        // Según documentación, Id_Empleado es AUTO_INCREMENT
        await pool.execute(
            'INSERT INTO inv_Empleados (Nombre, Apellido, Dui, Sueldo, Telefono, Nivel_Academico, Id_Administrador1) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [Nombre, Apellido, Dui, Sueldo, Telefono, Nivel_Academico, Id_Administrador1 || null]
        );
        
        res.redirect('/empleados');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const mostrarFormularioEditarEmpleado = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const [rows] = await pool.execute('SELECT * FROM inv_Empleados WHERE Id_Empleado = ?', [id]);
        
        if (rows.length === 0) return res.redirect('/empleados');
        
        res.render('empleados/formulario', { 
            titulo: 'Editar Empleado', 
            accion: `/empleados/editar/${id}?_method=PUT`, 
            empleado: rows[0] 
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const actualizarEmpleado = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Apellido, Dui, Sueldo, Telefono, Nivel_Academico } = req.body;

    if (parseFloat(Sueldo) <= 0) {
        return res.status(400).send('El sueldo debe ser un número mayor a 0');
    }

    try {
        const pool = await getConnection();
        await pool.execute(
            'UPDATE inv_Empleados SET Nombre = ?, Apellido = ?, Dui = ?, Sueldo = ?, Telefono = ?, Nivel_Academico = ? WHERE Id_Empleado = ?', 
            [Nombre, Apellido, Dui, Sueldo, Telefono, Nivel_Academico, id]
        );
        
        res.redirect('/empleados');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const eliminarEmpleado = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.execute('DELETE FROM inv_Empleados WHERE Id_Empleado = ?', [id]);
        res.redirect('/empleados');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    obtenerEmpleadosVista,
    mostrarFormularioEmpleado,
    crearEmpleado,
    mostrarFormularioEditarEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
};