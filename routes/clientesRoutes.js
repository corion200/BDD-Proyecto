const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

const controller = require('../controllers/clientesController');

router.get('/', controller.obtenerClientesVista);
router.get('/nuevo', controller.mostrarFormularioCliente);
router.post('/nuevo', controller.crearCliente);
router.get('/editar/:id', controller.mostrarFormularioEditarCliente);
router.put('/editar/:id', controller.actualizarCliente);
router.post('/eliminar/:id', controller.eliminarCliente);

module.exports = router;