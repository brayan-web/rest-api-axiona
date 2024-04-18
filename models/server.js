const express = require('express')
const cors = require('cors')

class Server {
    constructor(){
        this.app =  express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.solicitudesPath = '/api/solicitudes'
        //Middlewares
        this.middlewares();
        this.routes();
    }

    middlewares(){
        //Cors
        this.app.use( cors() );

        // Lectura y parseo del body 
        this.app.use(express.json());
        this.app.use(express.static('public') )
    }

    routes(){
       this.app.use(this.usuariosPath, require('../routes/usuarios'));
       this.app.use(this.solicitudesPath, require('../routes/solicitudes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Puerto Corriendo en puerto', this.port)
        })
    }
}

module.exports = Server