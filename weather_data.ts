import { fetchWeatherApi } from 'openmeteo';


export class weatherData{
    params = {
        latitude: [0],
        longitude: [0],
        temperature_unit: 'fahrenheit',
        current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m',
        hourly: 'temperature_2m,precipitation',
        daily: 'weather_code,apparent_temperature_max,apparent_temperature_min'
    };
    url = 'https://api.open-meteo.com/v1/forecast';

    constructor(latitude: number, longitude: number ){
        this.params.latitude = [latitude]
        this.params.longitude = [longitude];

    }
    async obtainWeatherData(): object{
        let current; 
        try{
            const responses = await fetchWeatherApi(this.url, this.params);
            let current = this.getCurrentTemp(responses[0]);
            let low = this.getLowTemp(responses[0]);
            let high = this.getHighTemp(responses[0]);

            console.log(current);
            console.log(typeof responses);
            return {"current": current, "low": low, "high": high};
        }
        catch(error){
            console.log(error);
            return {"error": error};
        }
        return {"current": current};

    }
    getCurrentTemp(response: object){
        return Math.round(response.current()!.variables(0)!.value());
    }
    getLowTemp(response: object){
        return Math.round(this.getMax(response.daily()!.variables(2)!.valuesArray()!));
    }
    getHighTemp(response: object){
        return Math.round(this.getMax(response.daily()!.variables(1)!.valuesArray()!));
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