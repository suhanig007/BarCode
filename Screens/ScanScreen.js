import React from 'react';
import {View,Text,TouchableOpacity, StyleSheet, Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
export default class ScanScreen extends React.Component{
    constructor(){
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
getCameraPermissions= async ()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
        hasCameraPositions: status === 'granted'
    })
}
handleBarCodeScanner= async({type,data})=>{
    this.setState({
        scanned:true,
        scannedData:data,
        buttonState:'normal'
    })
}
render(){
    const hasCameraPermissions=this.state.hasCameraPermissions;
    const scanned=this.state.scanned;
    const buttonState=this.state.buttonState;
if(buttonState==="clicked"&&hasCameraPermissions){
    return(
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined:this.handleBarCodeScanner}
        style={StyleSheet.absoluteFillObject}
        />
    )
}
else if(buttonState==='normal'){
    return(
        <View style={styles.container}>
            <Text style={styles.displayText}>{
                hasCameraPermissions = true ? this.state.scannedData:'Request Camera Permission'
            }

            </Text>
            <TouchableOpacity 
            onPress={this.getCameraPermissions}
            style={styles.scanButton}>
            
         <Text style={styles.buttonText}> Scan QR Code </Text>
         <Image
         style={styles.imageIcon}
         source={{
             uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg'
         }}
         />       
            </TouchableOpacity>
        </View>
    )
}
}

}