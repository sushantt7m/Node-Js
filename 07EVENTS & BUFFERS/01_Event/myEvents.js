const EventEmitter = require('events');


const eventEmitter = new EventEmitter();


eventEmitter.on('greet', (username) => {
    console.log(`Hello ${username}, Welcome to Events in Node Js`)
})

eventEmitter.on('greet', (username) => {
    console.log(`Hola ${username}, and nodejs is here`)
})

eventEmitter.once('pushNotify', () => {
    console.log(`This Event will run only once`)
})

// // Emit the event
// eventEmitter.emit('greet', 'Sushant');
// eventEmitter.emit('greet', 'chai');
// eventEmitter.emit('pushNotify');
// eventEmitter.emit('pushNotify');
// eventEmitter.emit('greet', 'chai');

const myListener = () => console.log("I am a test listener")
eventEmitter.on('test', myListener)
eventEmitter.emit('test')
eventEmitter.removeListener('test',myListener)
eventEmitter.emit('test')

console.log(eventEmitter.listeners('test'))
console.log(eventEmitter.listeners('greet'))