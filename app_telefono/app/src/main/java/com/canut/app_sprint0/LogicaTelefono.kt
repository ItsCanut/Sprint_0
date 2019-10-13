package com.canut.app_sprint0

import android.util.Log
import android.widget.Button
import androidx.annotation.IntegerRes
import kotlinx.android.synthetic.main.activity_main.*
import kotlin.properties.Delegates
import com.canut.app_sprint0.PeticionarioREST


// ---------------------------------------------------
//  LogicaTelefono
//  Encargada de enviar los datos al servidor REST.
//  Carlos Mª Canut Dominguez
//  13-10-2019
// ---------------------------------------------------

class LogicaTelefono {
    var a : Int by Delegates.notNull()
    var b : Int by Delegates.notNull()

    // ---------------------------------------------------
    //  Int, Int ->
    //  constructor()
    //  ->
    // ---------------------------------------------------
    constructor( a:Int , b:Int ){
        this.a = a
        this.b = b
    } // ()

    // ---------------------------------------------------
    //  ->
    //  constructor()
    //  ->
    // ---------------------------------------------------
    constructor(){} //()

    // ---------------------------------------------------
    //  Button ->
    //  start()
    //  ->
    // ---------------------------------------------------
    fun start(btn_start:Button) {
        // --- Inicio conexión con BLE ---
        btn_start.setOnClickListener {
            Log.e("START", "INICIADO");
        }

    } // ()

    // ---------------------------------------------------
    //  Button ->
    //  stop()
    //  ->
    // ---------------------------------------------------
    fun stop(btn_stop: Button){
        // --- Cerrar conexión con BLE ---
        btn_stop.setOnClickListener {
            Log.e("STOP","PARADO");
        }
    } // ()


}