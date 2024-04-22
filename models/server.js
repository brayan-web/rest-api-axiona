const express = require('express')
const cors = require('cors')
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')


class Server {
    constructor(){
        this.app =  express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.solicitudesPath = '/api/solicitudes';
        this.credentials = null;
        //Middlewares
        this.middlewares();
        this.routes();
    }

    async loadCredentials(){
        const client = new SecretManagerServiceClient();
        const name = 'projects/test-nodejs-303220/secrets/gc-credentials/versions/latest';
        try {
           const [ version ] = await client.accessSecretVersion({name});
           this.credentials = JSON.parse(version.payload.data.toString('utf8'));
           console.log("Credenciales cargadas correctamente");
           this.middlewares();
           this.routes();
           this.listen();

        } catch (error) {
                console.error("Error al cargar las credenciales", error);
                process.exit(1)
        }
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