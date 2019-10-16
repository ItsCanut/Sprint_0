// ---------------------------------------------------
//  ConexionBD.js
//  Modulo encargado de realizar la conexión con una base de datos sqlite3.
//  Carlos Mª Canut Dominguez
//  13-10-2019
// ---------------------------------------------------


var sqlite3 = require("sqlite3");
var fs = require("fs");

var moment = require("moment");


// ---------------------------------------------------
// ---------------------------------------------------
module.exports = class ConexionBD{


    // ---------------------------------------------------
    //  nombreFichero:BBDD->
    //  constructor()
    //  ->
    // ---------------------------------------------------
    constructor(nombreFichero, callback){
        this.nombreBaseDeDatos = nombreFichero;
        this._Conexion = null;

        this.intentarConexion(callback)
    } //


    // ---------------------------------------------------
    //  ->
    //  intentarConexion()
    //  ->
    // ---------------------------------------------------
    intentarConexion(callback){

        if(this._Conexion != null ){
            return
        }

        var that = this;

        this._Conexion = new sqlite3.Database(this.nombreBaseDeDatos, ( err ) => {
            if( err ){
                var mensaje = `ConexionBD: error al abrir ${that.nombreBaseDeDatos}. ${err}`;

                console.error( mensaje )

                that._Conexion = null;

                callback( mensaje );

                return;
            } // if

            // no error
            console.log( `ConexionBD: conexion abierta con "${that.nombreBaseDeDatos}". Hora: ${moment().format('HH:mm:ss')}` );

            callback( null ) // no error
        } // function( err )
        )

        if(this._Conexion){
            this._Conexion.run("PRAGMA foreign_keys = ON")
        }

    } // intentarConexion()



    // ---------------------------------------------------
    //  ->
    //  getConexion()
    //  -> 
    // ---------------------------------------------------
    getConexion( callback ){
        if( this._Conexion != null ){
            // ya habia una conexion, la devuelvo
            callback( this._Conexion)
                return
        }

            // no hay conexion todavia
            // abrir conexion
            var that=this
            this.intentarConexion(function(err){
                if( ! err ){
                    callback(that._Conexion)
                } else {
                    callback(null)
                }
            })
        
    } // getConexion()


    // ---------------------------------------------------
    //  ->
    //  cerrar()
    //  ->
    // ---------------------------------------------------
    cerrar(){
        this.getConexion(function(conexion){
            if(conexion != null){
                conexion.close()
            }
        })
    } // cerrar()


    // ---------------------------------------------------
    //  textoSQLite:Texto ->
    //  consultar()
    //  -> 
    // ---------------------------------------------------
    consultar(textoSQLite,callback){
        this.getConexion(function(conexion){
            conexion.all(textoSQLite,callback)
        })
    } // consultar()


    // --------------------------------------------------
    //  textoSQL: Texto, valores: JSON(clave,valor) // para sustituir en textoSQL ->
    //  modificar()
    //  -> 
    // --------------------------------------------------
    modificar(textoSQL, valores, callback){
        this.getConexion(function(conexion){
            conexion.run(textoSQL,valores,callback)
        })
    } // modificar()


} // class



    