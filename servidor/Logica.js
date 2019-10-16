// ---------------------------------------------------
//  Logica.js
//  Encargado de realizar las acciones necesarias a la base de datos.
//  Carlos Mª Canut Dominguez
//  13-10-2019
// ---------------------------------------------------


const ConexionBD = require("./ConexionBD.js")

// ---------------------------------------------------
// ---------------------------------------------------
module.exports = class Logica{

    // ---------------------------------------------------
    //  nombreBD:Texto ->
    //  constructor()
    //  -> 
    // ---------------------------------------------------
    constructor(nombreBD, callback){
        this._Conexion = new ConexionBD(nombreBD,callback);
    }

    // ---------------------------------------------------
    //  ->
    //  cerrar()
    //  ->
    // ---------------------------------------------------
    cerrar(){
        this._Conexion.cerrar();
    }

    // ---------------------------------------------------
    //  Input
    //  f()
    //  Output
    // ---------------------------------------------------
    getMedida(instante,callback){
        // consulta base de datos
        var textoSQLite = `select medida from mediciones where instante = "${instante}";` ; 

        // se realiza la petición a la base de datos usando ConexionBD.js
        this._Conexion.consultar( textoSQLite, ( err, res ) =>{



            if( err ){      // si no hay error -> se sigue
                callback(err, res);
                return;
            }

            if(res.length == 0 ){ // peticion no vacia -> se sigue

                callback( null, "No hay valores para este instante. ");
                return;
            }

            callback(null, res);
        })



    }   // getMedida()


    // .................................................................
	//
	// medicion: JSON {medicion: Texto, instante: Texto, posicion: Int}
	// -->
	//    nuevaMedicion () 
	// -->
	// void / Error // via callback( err )
	//
	// .................................................................
	nuevaMedicion ( instante, medida, posicion, callback ) {

		var textoSQL = `INSERT INTO mediciones (instante, medida, posicion) values ( "${instante}" , "${medida}"  , "${posicion}");` ;
		
		this.laConexion.modificar( textoSQL, callback ) ;
											  
	} // nuevaMedicion()

    

} // class



// ---------------------------------------------------
//  Input
//  f()
//  Output
// ---------------------------------------------------
    