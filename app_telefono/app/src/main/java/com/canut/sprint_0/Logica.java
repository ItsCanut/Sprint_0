package com.canut.sprint_0;

import android.util.Log;
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
/* EJEMPLO DE USO DE ESTA CLASE

    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    ...
     this.laLogica = new Logica("http://jsonplaceholder.typicode.com");
    ...


    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    public void botonLlamarLogicaPulsado(View v) {


        this.laLogica.preguntarAlgo(new Logica.RespuestaAPreguntarAlgo() {
            @Override
            public void respuesta(String respuesta) {
                Log.d(ETIQUETA_LOG, " MainActivity.botonLlamarLogicaPulsado() preguntarAlgo() : respuesta = " + respuesta);
            } // ()
        });

        this.laLogica.enviarMedicionDeAlgo("{\"a\": 12, \"b\": 34 }");

    } // ()


*/

// -----------------------------------------------------------------------------------
// @author: Jordi Bataller i Mascarell
// -----------------------------------------------------------------------------------
public class Logica {

    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    interface RespuestaAPreguntarAlgo {
        public void respuesta( String respuesta );
    } // interface

    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    private String urlServidor = null;

    // -------------------------------------------------------------------------------
	// constructor
    // -------------------------------------------------------------------------------
    public Logica( String urlServidor  ) {
        this.urlServidor = urlServidor;
    } // ()

    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    public void enviarMedicionDeAlgo( String datosJSON ) {

        PeticionarioREST elPeticionario = new PeticionarioREST();

        elPeticionario.hacerPeticionREST("POST",  this.urlServidor + "/posts/", datosJSON,
                new PeticionarioREST.Callback () {
                    @Override
                    public void respuestaRecibida( int codigo, String cuerpo ) {
                        Log.d( "RespuestaRecibida", "Logica.enviarMedicionDeAlgo() respuestaRecibida: codigo = "
                                + codigo + " cuerpo=" + cuerpo);
                    }
                },
                "application/json; charset=utf-8"
                );

        /*
        Ejempo con curl
        curl -d '{"key1":"pepito", "key2":"value2"}' -H "Content-Type: application/json; charset=utf-8" -X POST http://jsonplaceholder.typicode.com/posts/
         */
    } // ()

    // -------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------
    public void preguntarAlgo( final RespuestaAPreguntarAlgo cb ) {

        PeticionarioREST elPeticionario = new PeticionarioREST();

        elPeticionario.hacerPeticionREST("GET",  this.urlServidor + "/posts/", null,
                new PeticionarioREST.Callback () {
                    @Override
                    public void respuestaRecibida( int codigo, String cuerpo ) {
                        Log.d( "RespuestaRecibida", "Logica.preguntarAlgo() respuestaRecibida: codigo = "
                                + codigo + " cuerpo=" + cuerpo);
                        cb.respuesta( cuerpo );
                    } // ()
                } // new
        );

    } // ()

} // class
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
