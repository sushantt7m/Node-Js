const fs = require('fs')

function logger(req, res, next) {
    const log = `[${Date.now()}] ${req.method} ${req.path}\n`
    fs.appendFileSync('log.txt',log,'utf-8');
    next();
} 


module.exports = logger



