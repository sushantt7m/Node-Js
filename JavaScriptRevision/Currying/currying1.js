// function add(a) {
//     return function (b) {
//         return function (c) {
//             return a + b + c;
//         };
//     };
// }

// latest way to write closure function using callback 
const add = (a) => (b) => (c) => a+b+c;

let call1 = add(5);
let call2 = call1(0);
console.log(call2(6))

// console.log(add(2)(3)(5));

// function sendAutoEmail(to) {
//     return function (subject) {
//         return function (body) {
//             console.log(`Sending Email to ${to} with Subject ${subject}: ${body} `)
//         }
//     }
// }

// latest way to write closure function using callback 
const sendAutoEmail = (to) => (subject) => (body) =>
    `Sending email to ${to} with Subject: ${subject}: ${body}`;


let step1 = sendAutoEmail('Sushantkr211@gmail.com');
let step2 = step1('New order Confirmation');
console.log(step2('Hey Sushant your order is Confirmed'));
