const { Router } = require('express');
const { getSolicitudes, getSolicitudesPorusuario, getSolicitudesPorUsuarioYStatus  } = require('../controllers/solicitudes')
const router = Router();


router.get('/', getSolicitudes );
router.get('/:usuarioId', getSolicitudesPorusuario);
router.get('/:usuarioId/:status', getSolicitudesPorUsuarioYStatus)




module.exports = router;