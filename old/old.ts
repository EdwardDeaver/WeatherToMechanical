
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'
var spacetime = require('spacetime')

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'weatherdb';
var SunCalc = require("suncalc-ts");

const moment = require('moment-timezone');

let now = moment().format();
console.log(now);


let currentWeatherCondition = ""
let currentWeatherTemp = 0.0; 
let sunUp = false;

// To get the whole curve pre- make the day by doing a range


const myRun = await myProgram();
interface MyType {
    time: Date,
    windSpeedInKMH: number,
    tempInC: number,
    temperaturedescription: string,
    [key: string]: any
}




async function myProgram() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('weatherdb');
    let myCurrentWeather: MyType= await getTextDescription("KSYR");

   

    myCurrentWeather.sunup =  isSunUp();
    sunUp = myCurrentWeather.sunup;

    currentWeatherCondition = myCurrentWeather.temperaturedescription;
    currentWeatherTemp = myCurrentWeather.tempInC;
    let insertResult = await collection.insertOne(myCurrentWeather);
    console.log(insertResult);

    while(true){
    let myCurrentWeather: MyType= await getTextDescription("KSYR");
    myCurrentWeather.sunup = isSunUp();

    if((myCurrentWeather.sunup !=sunUp) || (currentWeatherCondition !=myCurrentWeather.temperaturedescription) || (currentWeatherTemp  !=myCurrentWeather.tempInC)){
        await collection.insertOne(myCurrentWeather);
    }
    sunUp = myCurrentWeather.sunup;

    currentWeatherCondition = myCurrentWeather.temperaturedescription;
    currentWeatherTemp = myCurrentWeather.tempInC;
    await delay( 60 * 1000 );
    }

}


 function isSunUp(): boolean{
    let times = SunCalc.getTimes( moment().unix()*1000, 43.0481, -76.1474);
    let localSunrise = moment.utc(times.sunrise).tz('America/New_York'); // add ur prefered timezone.
    let localNight = moment.utc(times.dusk).tz('America/New_York'); // add ur prefered timezone.
    return (localSunrise<moment() && localNight>moment())
}
async function writeScene(): Promise<void> {


}

async function getTextDescription(station: string): Promise<MyType> {
    console.log(station);
    let url = 'https://api.weather.gov/stations/'+station+'/observations/latest';
    console.log(url);
    const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
  const body = await response.json();
 // console.log(body.properties);



  let myStatus: MyType = {"time": new Date(), "windSpeedInKMH": body.properties.windSpeed.value, "tempInC": body.properties.temperature.value, "temperaturedescription": body.properties.textDescription }

  return myStatus;
}
async function delay( ms, state = null ) {
    
    return new Promise( ( resolve, reject ) => {
        setTimeout( () => resolve( state ), ms );
    } );
}

