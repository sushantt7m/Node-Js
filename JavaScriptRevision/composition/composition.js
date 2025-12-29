function add(a, b) {
    return a + b;
}

function square(val) {
    return val * val;
}

const addresult = add(2, 3);
console.log(square(addresult));

function addTwoandSquare(a, b) {
    return square(add(a, b));
}
console.log(addTwoandSquare(2, 3));

function composeTwoFunction(fn1, fn2) {
    return function (a, b) {
        return fn2(fn1(a, b))
    }
}

const taskFunction = composeTwoFunction(add,square)
console.log(taskFunction(2,3))