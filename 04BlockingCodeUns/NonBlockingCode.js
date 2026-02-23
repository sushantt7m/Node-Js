const fs  = require('fs');

console.log("First\n")

// Reading file Asynchronously-> NON BLOCKING CODE
fs.readFile('./contacts.txt','utf-8',(err,result)=>{
    if(err){
        console.log(err)
    }else{
        console.log(result)
    }
})

console.log("Second\n")
