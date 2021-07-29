 const express = require('express');
 const path = require('path');
 const mongoose = require('mongoose');
 const routes = require('./routes');
 const bodyParser = require('body-parser');

 //IMPORTAR VARIABLES DE ENTORNO LOCALES como de la base de datos
 require('dotenv').config({ path: 'variables.env' });

 //Crear el servidor
 const app = express();

//Conexion mongodb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
 
//Habilitar el body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Configurar los header HTTP para poder iniciar sesion
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
})

//habilitar routing o routes
app.use('/', routes());

// Leer localhost de variables y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

// puerto y arrancar el servidor
app.listen(port, host, () => {
    console.log('Servidor Funcionando')
})
 