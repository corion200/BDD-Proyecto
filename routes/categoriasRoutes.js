const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriasController');

router.get('/', controller.obtenerCategoriasVista);
router.get('/nuevo', controller.mostrarFormularioCategoria);
router.post('/nuevo', controller.crearCategoria);
router.get('/editar/:id', controller.mostrarFormularioEditarCategoria);
router.put('/editar/:id', controller.actualizarCategoria);
router.delete('/eliminar/:id', controller.eliminarCategoria);

module.exports = router;