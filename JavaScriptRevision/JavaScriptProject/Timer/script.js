const input = document.getElementById('input-box');

//we will get the value from the boc
const button = document.getElementById('btn');
button.addEventListener('click', () => {
    console.log(input.value)
});

// now we will apply interval