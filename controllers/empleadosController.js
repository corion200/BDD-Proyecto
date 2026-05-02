const { getConnection, sql } = require('../conexion');

const obtenerEmpleadosVista = async (req, res) => {
    try {
        const pool = await getConnection();
        // Hacemos join con Administrador para ver el jefe (opcional, pero útil)
        const result = await pool.request().query(`
            SELECT e.*, a.Correo as CorreoAdmin 
            FROM Inventario.Empleados e 
            LEFT JOIN Inventario.Administrador a ON e.Id_Administrador1 = a.Id_Administrador
        `);
        res.render('empleados/index', { empleados: result.recordset });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const mostrarFormularioEmpleado = async (req, res) => {
    try {
        const pool = await getConnection();
        const admins = await pool.request().query('SELECT * FROM Inventario.Administrador');
        res.render('empleados/formulario', { 
            titulo: 'Nuevo Empleado', 
            accion: '/empleados/nuevo', 
            empleado: null,
            administradores: admins.recordset 
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const crearEmpleado = async (req, res) => {
    const { Id_Empleado, Nombre, Apellido, Dui, Sueldo, Telefono, Nivel_Academico, Id_Administrador1 } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('Id_Empleado', sql.Int, Id_Empleado) // Ojo: La BD no es identity, se manda manual
            .input('Nombre', sql.VarChar, Nombre)
            .input('Apellido', sql.VarChar, Apellido)
            .input('Dui', sql.Char, Dui)
            .input('Sueldo', sql.Float, Sueldo)
            .input('Telefono', sql.VarChar, Telefono)
            .input('Nivel_Academico', sql.VarChar, Nivel_Academico)
            .input('Id_Administrador1', sql.Int, Id_Administrador1 || null)
            .query('INSERT INTO Inventario.Empleados (Id_Empleado, Nombre, Apellido, Dui, Sueldo, Telefono, Nivel_Academico, Id_Administrador1) VALUES (@Id_Empleado, @Nombre, @Apellido, @Dui, @Sueldo, @Telefono, @Nivel_Academico, @Id_Administrador1)');
        
        res.redirect('/empleados');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const eliminarEmpleado = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Inventario.Empleados WHERE Id_Empleado = @id');
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