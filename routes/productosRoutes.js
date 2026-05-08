const express = require('express');
const router = express.Router();

const productosController = require('../controllers/productosController');

// Rutas Web
router.get('/', productosController.obtenerProductosVista);
router.get('/nuevo', productosController.mostrarFormularioCrear);
router.post('/nuevo', productosController.crearProductoVista);
router.get('/editar/:id', productosController.mostrarFormularioEditar);
router.put('/editar/:id', productosController.actualizarProductoVista);
router.delete('/:id', productosController.eliminarProductoVista);

module.exports = router;