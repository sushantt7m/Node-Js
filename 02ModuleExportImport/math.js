function add(a,b){
    return a+b;
}

const sub = (a,b) =>{
    return a-b;
}

// the last export will overide the previous one
// module.exports = add;
// module.exports = sub;

// to tackle the overiding, we will export it like an object

// module.exports = {
//     add,sub
// }

module.exports={
    addFn:add,
    subFn:sub,
}