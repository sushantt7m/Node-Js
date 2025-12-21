const button = document.getElementById('get-location-button');
const cityName = document.getElementById('city-name');
const cityTemperature = document.getElementById('city-temperature');
const cityTime = document.getElementById('city-time');

async function getData(latitude,longitude){
    const promise = await fetch(`https://api.weatherapi.com/v1/current.json?key=141302ee02ce4318a96123924252112%20&q=${latitude},${longitude}&aqi=yes`);
    return await promise.json();
}

async function gotLocation (position){
    const result  = await getData(position.coords.latitude,position.coords.longitude);
    cityName.innerText = `${result.location.country}, ${result.location.name}, ${result.location.region}`;
    cityTime.innerText = `${result.location.localtime}`;
    cityTemperature.innerText = `${result.current.temp_c} celcius`;
    
    console.log(result);
    // console.log(position);
}
function failedtoGetLocation(){
    console.log("There was some issue");
}



button.addEventListener('click',async()=>{
    // const result = navigator.geolocation.getCurrentPosition(()=>{},()=>{})
    const result = navigator.geolocation.getCurrentPosition(gotLocation,failedtoGetLocation);
});