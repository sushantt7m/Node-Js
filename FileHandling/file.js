const fs =require('fs');

// synchronous call
fs.writeFileSync('./test.txt','Hello world')
// Asynchronous call
fs.writeFile('./test.txt','Hello world Async',(err)=>{})

// reading contact file

const result = fs.readFileSync('./contacts.txt',"utf-8")
console.log(result);