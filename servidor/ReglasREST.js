// ---------------------------------------------------
//  ReglasREST.js
//  Encargado de definir las respuestas a las peticiones HTTP que pueda recibir el servidor.
//  Carlos Mª Canut Dominguez
//  13-10-2019
// ---------------------------------------------------


// Cargar reglasREST
module.exports.cargar = (servidorExpress, laLogica) => {
    const express = require('express');
    var path = require('path');
    servidorExpress.use(express.static(path.join(__dirname,'./web')));


    // ---------------------------------------------------
    //  req: Peticion HTTP ->
    //  get('/prueba')
    //  -> 
    // ---------------------------------------------------
    servidorExpress.get('/prueba', (req,res) => {
        console.log("\n -----")
        console.log("\n GET /")
        console.log(`\t url= ${req.url} `)
        console.log("\n -----")
		
		res.send(" GET /prueba funcionó" )
    })

	

    

    // ---------------------------------------------------
    //  instante:int ->
    //  get('/medida/ozono/:instante')
    //  -> medida:float
    // ---------------------------------------------------
    servidorExpress.get('/medida/ozono/:instante', (req,response) => {
        console.log("\n -----")
        console.log("\n GET /mediciones/ozono")
        console.log(`\t url:${req.url}`)
        console.log("\n -----")

        const instante = req.params.instante;
        console.log(`\t instante = ${instante}`);

        laLogica.getMedida(instante, ( err , res ) => {

            if ( err ) {
                response.status(404).send(err);
                response.end();
                return;
            }

            // respuesta correcta
            response.status(200).send(res);

            response.end();
        }); // getMedida ()
    }); // app.get() GET MEDIDA


    // ---------------------------------------------------
    //  instante:int, medida:float ->
    //  post('/nuevamedida/ozono/:instante/:medida')
    //  -> 
    // ---------------------------------------------------
    servidorExpress.post('/nuevamedida/ozono/:instante/:medida/:posicion', (req,response) => {
        console.log("POST DE NUEVA MEDICIÓN");

        const instante = req.params.instante;
        const medida = req.params.medida;
        const posicion = req.params.posicion;

        console.log(`\t instante = ${instante} \n medida = ${medida} \n posicion = ${posicion}`);

        laLogica.nuevaMedicion( instante, medida, posicion,  ( err, res ) => {

			if ( err ) {

				response.status(404).send(err) ;

				response.end();

				return;
			}
			
			//
			// respuesta correcta
            //
            
            console.log("POST funcionando")
			response.status(200).send(res) ;
			
			//
			// 
			//
			response.end()	;
		}); // nuevaZona ()

    })




}


// ---------------------------------------------------
//  Input
//  f()
//  Output
// ---------------------------------------------------
    