import axios, {isCancel, AxiosError} from 'axios';

export class weatherData{
    params = {
        latitude: [0],
        longitude: [0],
        temperature_unit: 'fahrenheit',
        current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m',
        hourly: 'temperature_2m,precipitation_probability',
        daily: 'weather_code,apparent_temperature_max,apparent_temperature_min',
    	timezone: 'America/New_York'
    };
    url = 'https://api.open-meteo.com/v1/forecast';
    lastMessage; 
    constructor(latitude, longitude ){
        this.params.latitude = [latitude]
        this.params.longitude = [longitude];

    }
    async obtainWeatherData(){
        let current; 
        try{

            let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.open-meteo.com/v1/forecast?timezone=America%2FNew_York&latitude=43.056910&longitude=-76.158030&current_weather=true&temperature_unit=fahrenheit&daily=weather_code,apparent_temperature_max,apparent_temperature_min,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,precipitation_probability&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m',
            headers: { },
            };

            const weatherData = await axios.request(config)
            .then((response) => {
                this.lastMessage = response.data;
            return(response.data);
            })
            .catch((error) => {
            console.log(error);
            });
            console.log(weatherData);
            let current = this.getCurrentTemp(weatherData);
            let low = this.getLowTemp(weatherData);
            let high = this.getHighTemp(weatherData);
	    let currentDate = this.getTime(weatherData);
            return {"current": current, "low": low, "high": high, "date": currentDate};
        }
        catch(error){
            console.log(error);
            return {"error": error};
        }
        return {"current": current};

    }
    getTime(response){
	const options = {
  month: "short",
  day: "numeric",
};
	let date = new Date(response["current_weather"]["time"])
	let myDate = date.toLocaleString("en-US", options)
    	return myDate;
}
	getCurrentTemp(response){
        //console.log(response.current().variables(0).value());
        return Math.round(response["current_weather"].temperature);
    }
    getLowTemp(response){
        console.log(Math.round(response["daily"].temperature_2m_min[0]));
        return Math.round(response["daily"].temperature_2m_min[0]);
    }
    getHighTemp(response){
        console.log(Math.round(response["daily"].temperature_2m_max[0]))
        return Math.round(response["daily"].temperature_2m_max[0]);
    }
    

    getMin(A) {
        let mini = Infinity;
        for (let i = 0; i < A.length; i++) {
            if (A[i] < mini) {
                mini = A[i];
            }
        }
        return mini;
    }
    
    getMax(A) {
        let maxi = -Infinity;
    
        for (let i = 0; i < A.length; i++) {
            if (A[i] > maxi) {
                maxi = A[i];
            }
        }
        return maxi;
    }
    

}
