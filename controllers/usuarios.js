const { response } = require('express')


const usuariosGet = (req, res =  response) => {
    res.json({
        ok: true,
        msg: 'Esta es una peticion GET - Controlador'
    });
  }


  module.exports = {
    usuariosGet
  }


