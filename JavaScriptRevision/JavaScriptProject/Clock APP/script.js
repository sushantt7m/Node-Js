const button = document.getElementById('stop-btn');
function showTime() {
    const currentTime = new Date();
    const time = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
    console.log(time);
    document.getElementById('time').innerText = time;
}


let interval = setInterval(showTime,1000);
button.addEventListener('click',()=>{
    clearInterval(interval);
})