package com.canut.sprint_0;

import android.bluetooth.BluetoothA2dp;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.le.BluetoothLeScanner;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.content.Context;
import android.util.Log;

public class ReceptorBLE {

    private BluetoothAdapter bluetoothAdapter;
    private Context context;
    private BluetoothLeScanner leScanner;
    private boolean mScanning;

    private ScanCallback scanCallback = new ScanCallback() {
        @Override
        public void onScanResult(int callbackType, ScanResult result) {

            TramaIBeacon tramaBeacon = new TramaIBeacon(result.getScanRecord().getBytes());

            Log.e("trama beacon","Trama beacon recibida");


        }
    };

    public ReceptorBLE(Context context, BluetoothAdapter bluetoothAdapter){

        this.context = context;
        this.bluetoothAdapter = bluetoothAdapter;

        leScanner = bluetoothAdapter.getBluetoothLeScanner();
    }

    public void startScanning(){
        leScanner.startScan(scanCallback);
    }

    public void stopScanning(){
        leScanner.stopScan(scanCallback);
    }
}
