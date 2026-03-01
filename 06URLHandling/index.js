const http = require('http');
const fs = require('fs');
const url = require('url')


const myServer = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()}:${req.url}  Request Received\n`

    const myUrl = url.parse(req.url, true)
    console.log(myUrl);

    fs.appendFile('./log.txt', log, (err, data) => {
        switch (myUrl.pathname) {
            case '/': res.end("Home Page");
                break;
            case '/about':
                const username = myUrl.query.myName
                const userId = myUrl.query.userId

                res.end(`Username is : ${username} and userId is :${userId}`);

                break;
            case '/contact': res.end("contact");
                break;
            default: res.end("404 Not found");
        }
    })
})

myServer.listen("8000", console.log("Server Started"));