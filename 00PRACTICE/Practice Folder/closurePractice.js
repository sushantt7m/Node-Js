const createCounter = () => {
    let count = 0;

    function inner() {
        count++;
        console.log(count);
    }

    return inner;
}
const counter = createCounter();

counter();
counter();
counter();
counter();


const createMultiplier = (x) => {
    
    return function(y){
        console.log(x*y);
    }

    // function inner(y){
    //     console.log(x*y);
    // }
    // return inner;
    
    // return function(y){
    //     return x*y;
    // }

    // function inner(y){
    //     return x*y;
    // }
    // return inner;
    
}

const doubleFunction = createMultiplier(2);
const tripleFunction = createMultiplier(3);

doubleFunction(5);
tripleFunction(20);