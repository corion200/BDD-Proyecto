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
    const { Id_Empleado, Nombre, Apellido, Dui, Sueldo, Telefono, Nivel_Academico, Id_Administrador1 } = req.body;
    try {
        const pool = await getConnection();
        await pool.execute(
            'INSERT INTO inv_Empleados (Nombre, Apellido, Dui, Sueldo, Telefono, Nivel_Academico, Id_Administrador1) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [Nombre, Apellido, Dui, Sueldo, Telefono, Nivel_Academico, Id_Administrador1 || null]
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
    eliminarEmpleado
};