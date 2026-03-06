const fs = require('fs')
function logger(req,res,next){
    const log = `${new Date().toISOString()} | ${req.method} | ${req.url}\n`;

    fs.appendFile('./log.txt',log,(err)=>{
        if(err) console.log("Error logging",err)
    })

    next();
    
}


module.exports = logger;