const apikey = "74d4ee92ab12fc99266254f33f5c55c0";
const weatherDataE1 = document.getElementById("Weather-data");
const cityInputE1 = document.getElementById("city-input" );
const formE1 = document.querySelector("form");

formE1.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue = cityInputE1.value;
    console.log(cityValue);
    getWeatherData(cityValue)

});
async function getWeatherData(cityValue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);

        if(!response.ok){
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon
        const details = [
            `Feels like : ${ Math.round(data.main.feels_like)}°C`,
            `Humidity : ${(data.main.humidity)}% `,
            `Wind speed : ${data.wind.speed}m/s`,
        ]
        weatherDataE1.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="WeatherIcon"></img>`

        weatherDataE1.querySelector(".temperature").textContent = `${temperature}°C`;

        weatherDataE1.querySelector(".description").innerText = `${description}`;

        weatherDataE1.querySelector(".details").innerHTML =
              `<div>${details[0]}</div>
                <div>${details[1]}</div>
                <div>${details[2]}</div>`
    }catch(error) {
        weatherDataE1.querySelector(".icon").innerHTML =""
        weatherDataE1.querySelector(".temperature").textContent = "";

        weatherDataE1.querySelector(".description").innerText = "An error happened please try again"

        weatherDataE1.querySelector(".details").innerHTML =""
              
    }
}