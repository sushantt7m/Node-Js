// creating server using http
const http = require('http');

const myServer = http.createServer((req, res) => {
    console.log(req);
    res.end('Hello from Server again');
});



myServer.listen(8000,()=>console.log("Server Started!"));
