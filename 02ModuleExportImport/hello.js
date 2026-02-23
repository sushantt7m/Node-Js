console.log("We will use math.js in this file");

const math = require("./math");

console.log("Addn value is :",math.addFn(2,3))
console.log("Subn value is :",math.subFn(2,3))


// or we can destricture it directly

const {addFn,subFn} = require("./math");

console.log(addFn(3,4));
console.log(subFn(3,4));