function adder(num){
    function add(b){
        console.log(num+b);
    }
    return add;
}

const addTo5 = adder(5);
const addTo10 = adder(10);

addTo5(2);
addTo10(12);