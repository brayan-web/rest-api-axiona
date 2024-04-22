const { response } = require('express');
// const { db } = require('../firebase/firebaseConfig');
const { getDb } = require('../firebase/firebaseConfig');

const usuariosGet = async(req, res =  response) => {
    try {
      const db = await getDb();
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









  module.exports = {
    usuariosGet
  }


