import { fetchWeatherApi } from 'openmeteo';

const params = {
    latitude: [43.0481],
    longitude: [-76.1474],
    temperature_unit: 'fahrenheit',
    current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m',
    hourly: 'temperature_2m,precipitation',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min'
};
const url = 'https://api.open-meteo.com/v1/forecast';
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

console.log( response.daily()!.variables(1)!.valuesArray()!);
const current = response.current()!.variables(0)!.value();
const dailyLow = setMaxi(response.daily()!.variables(2)!.valuesArray()!)
const dailyHigh = setMaxi(response.daily()!.variables(1)!.valuesArray()!);

console.log(current);
console.log(dailyLow);
console.log(dailyHigh);



function CelToFar(x: number): number{
	return Math.round( ( (x * 9/5) + 32))
}
function setMini(A) {
    let mini = Infinity;
    for (let i = 0; i < A.length; i++) {
        if (A[i] < mini) {
            mini = A[i];
        }
    }
    return mini;
}

function setMaxi(A) {
    let maxi = -Infinity;

    for (let i = 0; i < A.length; i++) {
        if (A[i] > maxi) {
            maxi = A[i];
        }
    }
    return maxi;
}