import axios, {isCancel, AxiosError} from 'axios';

export class weatherData{
    params = {
        latitude: [0],
        longitude: [0],
        temperature_unit: 'fahrenheit',
        current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m',
        hourly: 'temperature_2m,precipitation_probability',
        daily: 'weather_code,apparent_temperature_max,apparent_temperature_min'
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
            url: 'https://api.open-meteo.com/v1/forecast?latitude=43.056910&longitude=-76.158030&current_weather=true&temperature_unit=fahrenheit&daily=weather_code,apparent_temperature_max,apparent_temperature_min,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,precipitation_probability&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m',
            headers: { }
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
            return {"current": current, "low": low, "high": high};
        }
        catch(error){
            console.log(error);
            return {"error": error};
        }
        return {"current": current};

    }
    getCurrentTemp(response){
        //console.log(response.current().variables(0).value());
        return Math.round(response["current_weather"].temperature);
    }
    getLowTemp(response){
        return Math.round(response["daily"].temperature_2m_min);
    }
    getHighTemp(response){
        
        return Math.round(response["daily"].temperature_2m_max);
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