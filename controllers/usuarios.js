const { response } = require('express');
const { db } = require('../firebase/firebaseConfig');

const usuariosGet = async(req, res =  response) => {
    try {
      const snapshot = await db.collection('usuarios').get();
      const usuarios = snapshot.docs.map(doc => doc.data());
      res.json({
        ok: true,
        msg: 'Lista de usuarios obtenida correctamente',
        data: usuarios
      })
    } catch (error) {
        console.log(error);
        res.status(500).json({
          ok: false,
          msg: 'Error al obtener los usuarios',
          error
        })
    };
    
  }

const getSolicitudes = () => {

}


  const usuariosPost = (req, res =  response) => {
    const { nombre, edad } = req.body;

    res.json({
        ok: true,
        msg: 'Esta es una peticion POST - Controlador',
        nombre,
        edad
    });
  }

  const usuariosPut = (req, res =  response) => {
    const { id } = req.params;
    res.json({
        ok: true,
        msg: 'Esta es una peticion PUT - Controlador',
        id
    });
  }


  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    getSolicitudes
  }


