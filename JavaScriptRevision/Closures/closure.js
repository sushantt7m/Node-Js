// A closure is a combination of function bundled together with references to its surrounding state (the lexical environment).  In other words , a closure gives you access yo an outer function's scope for an inner function. 
// In java script , cloisures are created everytime a function is creaated , at function creation time.

function main(name) {
    // const name = "Sushant kumar"

    function sayMyName() {
        console.log(name);
    }

    return sayMyName;
}

let consoleSushant = main('Sushantt');
consoleSushant();
consoleSushant();

console.log(consoleSushant);