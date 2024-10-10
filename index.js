import { textTransforms } from "./text_transforms.js"; 
import {weatherData} from "./weather_data.js";
import {writeToDevice} from "./write_to_device.js";
import { SerialPort } from 'serialport';


async function main(){

    const myList = await SerialPort.list();
    console.log(myList);
    const myTransform = new textTransforms();
    const SyracuseLatitude = 43.0481;
    const SyracuseLongitude = -76.1474;
    const gettingWeather = new weatherData(SyracuseLatitude, SyracuseLongitude);
    
    const writer = new writeToDevice(0x00, "/dev/tty.usbserial-B001BJRJ", 57600 );
    
    let weatherString = ""
    let leftover = (31 - 3) - weatherString.length 
    let full = weatherString.concat("_".repeat(leftover))

    console.log(full)
    console.log(full.length)
    console.log(weatherString);
    
    console.log(myTransform.transformStringToHexArray(full));
    writer.messageWrite(0x83,  0x00 , myTransform.transformStringToHexArray(full))

    await sleep(4000)


    
    let weatherDataVars = await gettingWeather.obtainWeatherData();
     weatherString = "CUR__" + weatherDataVars["current"]+ "LO___" + weatherDataVars["low"] + "HI___" + weatherDataVars["high"];
     leftover = (31 - 3) - weatherString.length 
     full = weatherString.concat("_".repeat(leftover))

    console.log(full)
    console.log(full.length)
    console.log(weatherString);
    
    console.log(myTransform.transformStringToHexArray(full));
    console.log(weatherString);


    

   writer.messageWrite(0x83,  0x00 , myTransform.transformStringToHexArray(full))
    
    
    
    
}


const mainFunction = await main();
console.log(mainFunction);


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  