const math = require('./math')
const {message} = require('./message')

// const directory = require('_dirname')
// console.log(directory);


console.log(`Addition: ${math.add(5,2)}`)
console.log(`Subtraction: ${math.subtract(5,3)}`)
console.log(`Multiplication: ${math.multiply(5,3)}`)
message.greet("Sushant");