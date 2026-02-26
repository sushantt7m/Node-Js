const fs = require('fs')
const http = require('http')

const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}:new Request Received\n`;
    fs.appendFile('log.txt', log, (err, data) => {
        res.end("Hello From Assignment")
    })
})

myServer.listen(8000,()=>console.log("Server Started"))