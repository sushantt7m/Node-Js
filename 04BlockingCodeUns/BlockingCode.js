const fs = require('fs');


console.log("First\n");

// Reading file Synchronously --->> BLOCKING CODE
const result = fs.readFileSync('./contacts.txt','utf-8');
console.log(result, "\n");


console.log("Second")


// since the Result is Blocking Code, the sequence would be First, contact,Second 