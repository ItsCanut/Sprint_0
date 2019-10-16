// ---------------------------------------------------
//  ServidorREST.js
//  Iniciar el servidor, activa las reglas REST y usa la logica para iniciar una conexión con la base de datos.
//  Carlos Mª Canut Dominguez
//  13-10-2019
// ---------------------------------------------------


const express = require( 'express' ) ;
const bodyParser = require('body-parser');
const Logica = require('./Logica.js');



// ---------------------------------------------------
//  Creación del servidor
// ---------------------------------------------------
var servidorExpress = express();


servidorExpress.use( bodyParser.text({ type: 'text/plain'}) ) ;     // copia el cuerpo de la peticion HTTP y lo mete en el "body" de "req" para poder consultarlo en todo momento.

const PORT = process.env.PORT || 3000 ;





// ---------------------------------------------------
//  Abrir conexion con logica, cargar reglasREST y arrancar server
// ---------------------------------------------------
var laLogica = new Logica("./base_De_Datos/mediciones.db", ( err ) => {

    // Cargar reglasREST
    var reglas = require('./ReglasREST.js');
    reglas.cargar(servidorExpress, laLogica );

    //Arrancar servidor
    servidorExpress.listen( PORT, () => {
        console.log( `Servidor Express inicializado en http://localhost:${PORT}` );
    })


}) // _logica

