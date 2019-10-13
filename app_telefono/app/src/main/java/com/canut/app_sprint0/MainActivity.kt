package com.canut.app_sprint0

// ---------------------------------------------------
//  MainActivity
//  Encargado de recoger los datos enviados por el iBeacon y enviarlos al servidor.
//  Carlos Mª Canut Dominguez
//  13-10-2019
// ---------------------------------------------------


import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import kotlinx.android.synthetic.main.activity_main.*
import com.canut.app_sprint0.LogicaTelefono
import com.canut.app_sprint0.PeticionarioREST

class MainActivity : AppCompatActivity() {

    // ---------------------------------------------------
    //  ->
    //  onCreate()
    //  ->
    // ---------------------------------------------------
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val logica = LogicaTelefono()

        logica.start(btn_start)
        logica.stop(btn_stop)



    }
}
