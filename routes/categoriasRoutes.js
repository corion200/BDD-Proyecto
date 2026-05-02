const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriasController');

router.get('/', controller.obtenerCategoriasVista);
router.get('/nuevo', controller.mostrarFormularioCategoria);
router.post('/nuevo', controller.crearCategoria);
router.post('/eliminar/:id', controller.eliminarCategoria);

module.exports = router;