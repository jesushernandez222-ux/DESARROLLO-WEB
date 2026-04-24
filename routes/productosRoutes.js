const express = require('express');
const router = express.Router();
const controller = require('../controllers/productosController');

router.get('/', controller.listar);
router.get('/crear', controller.crearVista);
router.post('/crear', controller.crear);
router.get('/editar/:id', controller.editarVista);
router.post('/editar/:id', controller.editar);
router.post('/eliminar/:id', controller.eliminar);

module.exports = router;
