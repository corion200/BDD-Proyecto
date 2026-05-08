const express = require('express');
const router = express.Router();
const controller = require('../controllers/empleadosController');

router.get('/', controller.obtenerEmpleadosVista);
router.get('/nuevo', controller.mostrarFormularioEmpleado);
router.post('/nuevo', controller.crearEmpleado);
router.get('/editar/:id', controller.mostrarFormularioEditarEmpleado);
router.put('/editar/:id', controller.actualizarEmpleado);
router.delete('/eliminar/:id', controller.eliminarEmpleado);

module.exports = router;