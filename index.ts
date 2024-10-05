import { textTransforms } from "./text_transforms.ts"; 
import {weatherData} from "./weather_data.ts";
import {writeToDevice} from "./write_to_device.ts";

const myTransform = new textTransforms();
const SyracuseLatitude = 43.0481;
const SyracuseLongitude = -76.1474;
const gettingWeather = new weatherData(SyracuseLatitude, SyracuseLongitude);


let weatherDataVars: object = await gettingWeather.obtainWeatherData();
let weatherString: string = weatherDataVars["current"]+"_" + weatherDataVars["low"] + "_" + weatherDataVars["high"];


console.log(myTransform.transformStringToHexArray(weatherString));
console.log(weatherString);