import { textTransforms } from "./text_transforms.js"; 
import {weatherData} from "./weather_data.js";
import {writeToDevice} from "./write_to_device.js";
import { SerialPort } from 'serialport';
import pkg from 'websocket';
const {client} = pkg;


async function main(connection){
  while(1){



    const myList = await SerialPort.list();
    console.log(myList);
    const myTransform = new textTransforms();
    const SyracuseLatitude = 43.0481;
    const SyracuseLongitude = -76.1474;
    const gettingWeather = new weatherData(SyracuseLatitude, SyracuseLongitude);
    
    const writer = new writeToDevice(0x00, "ws://localhost:5000/ws" );
    
    let weatherString = ""
    let leftover = (31 - 3) - weatherString.length 
    let full = weatherString.concat("_".repeat(leftover))

    console.log(full)
    console.log(full.length)
    console.log(weatherString);
    
    console.log(myTransform.transformStringToHexArray(full));
    //writer.messageWrite(0x83,  0x00 , myTransform.transformStringToHexArray(full))

  //  await sleep(4000)


    
    let weatherDataVars = await gettingWeather.obtainWeatherData();
     weatherString = "CUR__" + weatherDataVars["current"]+ "LO___" + weatherDataVars["low"] + "HI___" + weatherDataVars["high"];
     leftover = (31 - 3) - weatherString.length 
     full = weatherString.concat("_".repeat(leftover))
/*
    console.log(full)
    console.log(full.length)
    console.log(weatherString);
    
    console.log((myTransform.transformStringToHexArray(full).toString()));
    console.log(weatherString);
*/
    let header = [0x80, 0x83, 0x00]
    var data = header.concat(myTransform.transformStringToHexArray(full), [0x8F]);

    console.log(data);
    console.log(data.length);


    var array = new Uint8Array(32);
    array[0]=0x80;
    array[1]=0x83;
    array[2]=0x00;

    let hexVar = myTransform.transformStringToHexArray(full)
    for (let i = 0; i<myTransform.transformStringToHexArray(full).length; i++){
      array[i+3]= hexVar[i];
    }
    array[31]=0x8F;
    connection.sendUTF(array);
    await sleep(60000*10)
  }

 //   writer.networkWrite(0x83,  0x00, myTransform.transformStringToHexArray(full) );
   //writer.messageWrite(0x83,  0x00 , myTransform.transformStringToHexArray(full))
    
    
    
    
}


//const mainFunction = await main();
//console.log(mainFunction);


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  



var clientWeb = new client();

clientWeb.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

clientWeb.on('connect', async function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
    const mainFunction = await main(connection);

});

clientWeb.connect('ws://127.0.0.1:5000/ws');