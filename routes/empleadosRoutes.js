const express = require('express');
const router = express.Router();
const controller = require('../controllers/empleadosController');

router.get('/', controller.obtenerEmpleadosVista);
router.get('/nuevo', controller.mostrarFormularioEmpleado);
router.post('/nuevo', controller.crearEmpleado);
router.post('/eliminar/:id', controller.eliminarEmpleado);

module.exports = router;