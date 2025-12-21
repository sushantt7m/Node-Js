const button = document.getElementById('search-button');
const input = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const cityTime = document.getElementById('city-time');
const cityTemperatur = document.getElementById('city-temperature');

async function getData(cityName){
   const promise =await fetch(`https://api.weatherapi.com/v1/current.json?key=141302ee02ce4318a96123924252112%20&q=${cityName}&aqi=yes`);
    return await promise.json();
}

button.addEventListener('click',async ()=>{
    const value = input.value;
    const result = await getData(value);
    cityName.innerText = `${result.location.name},${result.location.region},${result.location.country}`;
    cityTime.innerText = `${result.location.localtime}`;
    cityTemperatur.innerText = `${result.current.temp_c}`;
    // console.log(result);
});

// 