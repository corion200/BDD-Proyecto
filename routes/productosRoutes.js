const express = require('express');
const router = express.Router();
// Necesario para que los formularios envíen PUT y DELETE
const methodOverride = require('method-override'); 
router.use(methodOverride('_method'));

const productosController = require('../controllers/productosController');

// Rutas Web
router.get('/', productosController.obtenerProductosVista);
router.get('/nuevo', productosController.mostrarFormularioCrear);
router.post('/nuevo', productosController.crearProductoVista);
router.get('/editar/:id', productosController.mostrarFormularioEditar);
router.put('/editar/:id', productosController.actualizarProductoVista);
router.post('/eliminar/:id', productosController.eliminarProductoVista); 

module.exports = router;