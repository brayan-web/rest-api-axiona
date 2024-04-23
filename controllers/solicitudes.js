const { response } = require('express');
// const { db } = require('../firebase/firebaseConfig');
const { getDb } = require('../firebase/firebaseConfig');



const getSolicitudes = async(req, res = response) => {
    try {
        const db = await getDb();
        const solicitudesSnapshot = await db.collection('solicitudes').get();
        const solicitudes = solicitudesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
        res.json({
            ok: true,
            msg: 'Solicitudes obtenidas exitosamente',
            data: solicitudes
        })
    } catch (error) {
        console.log('Error fetching solicitudes',error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las solicitudes',
            error
        })
    };
}

const getSolicitudesPorusuario = async(req, res =  response) => {
        const usuarioId =  req.params.usuarioId;
        try {
            const db = await getDb();
            const solicitudesSnapshot = await db.collection('solicitudes')
            .where('creator.uid', '==', usuarioId).get();

            const solicitudes = solicitudesSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            res.json({
                ok: true,
                msg: 'Solicitudes del usuario obtenidas exitosamente',
                data: solicitudes
            })
        } catch (error) {
            console.log("Error fetching user's solicitudes:",error);
            res.status(500).json({
                ok: false,
                msg: 'Error al obtener las solicitudes del usuario',
                error
            })
        };
        
}

const getSolicitudesPorUsuarioYStatus = async(req, res = response) => {
    const usuarioId = req.params.usuarioId;
    const status = parseInt(req.params.status);
    console.log(usuarioId)
    console.log(status)
    try {
        const db = await getDb();

        const solicitudesSnapshot = await db.collection('solicitudes')
            .where('creator.uid', '==', usuarioId)
            .where('status', '==', status)
            .get();

        const solicitudes = solicitudesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.json({
            ok: true,
            msg: 'Solicitudes del usuario por estado obtenidas exitosamente',
            data: solicitudes
        });
    } catch (error) {
        console.log("Error fetching user's solicitudes by status:", error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las solicitudes del usuario por estado',
            error
        });
    }
};

const actualizarEstatusSolicitud = async(req, res = response) => {
        const solicitudId = req.params.solicitudId;
        const nuevoEstado = req.body.actualizarEstado;
        try {
            const db = await getDb();

            await db.collection('solicitudes').doc(solicitudId)
            .update({
                status: nuevoEstado
            });

            res.json({
                ok: true,
                msg: 'Estado de la solicitud actualizado exitosamente'
            })
        } catch (error) {
            console.log('Error actualizando el estado de la solicitud',error);
            res.status(500).json({
                ok: false,
                msg: 'Error al actualizar el estado de la solicitud'
            })
        };       
}



 


  module.exports = {
    getSolicitudes,
    getSolicitudesPorusuario,
    getSolicitudesPorUsuarioYStatus,
    actualizarEstatusSolicitud
  }


