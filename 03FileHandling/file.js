const fs = require('fs');

// this fs module is built in in nodeJs


// // Writing to the file
// // Sync.... 
// fs.writeFileSync('./test_sync.txt',"Hey Sushant!")

// //Async.... 
// fs.writeFile('./test_async.txt',"Hey Sushant async",(err)=>{})

// // Reading from the file-> Sync.....(needs variable to store the result)
// const result = fs.readFileSync('./contact.txt','utf-8')
// console.log(result)


// // Reaading from file Async....(gives void)
// fs.readFile('./contact.txt','utf-8',(err,result)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(result)
//     }
// })


// now we wont be overriding the files
// we will append
fs.appendFileSync("./test_sync.txt",`\n${Date.now().Date()}Hello Sushant`)

