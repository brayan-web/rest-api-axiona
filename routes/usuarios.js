const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, getSolicitudes  } = require('../controllers/usuarios')
const router = Router();

router.get('/', usuariosGet );
router.get('/', getSolicitudes );
router.post('/', usuariosPost );
router.put('/:id', usuariosPut );




module.exports = router;