// creating a server using built in http
const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}:${req.url} new Request Received\n`;
    fs.appendFile('./log.txt', log, (err, data) => {
        // res.end("Hello from Server Again")
        switch (req.url) {
            case '/': res.end("Homepage");
                break;
            case '/about': res.end("about");
                break;
            case '/contact-us': res.end("contact-us");
                break;
            case '/nav': res.end("nav");
                break;
            case '/home': res.end("Home");
                break;
            default:
                res.end("404 Not found");
        }
    })
    console.log("New Request Received");
    // console.log(req)
});

// we need port to run our server
myServer.listen(8003, () => console.log("Server Started"))

