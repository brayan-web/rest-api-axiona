const { Router } = require('express');
const { getSolicitudes, getSolicitudesPorusuario, getSolicitudesPorUsuarioYStatus, actualizarEstatusSolicitud  } = require('../controllers/solicitudes')
const router = Router();


router.get('/', getSolicitudes );
router.get('/:usuarioId', getSolicitudesPorusuario);
router.get('/:usuarioId/:status', getSolicitudesPorUsuarioYStatus);
router.put('/:solicitudId/actualizarEstado', actualizarEstatusSolicitud)




module.exports = router;