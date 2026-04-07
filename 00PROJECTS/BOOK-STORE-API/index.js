require('dotenv/config')    // this is going to load all the dotenv variable
const express = require('express')
const bookRouter = require('./routes/book.route');


const app = express();
const PORT = 8000;


// MIDDLEWARE(Plugin)(GLOBAL LEVEL MIDDLEWARES)
app.use(express.json())
// app.use(loggerMiddleware)


// routes
app.use('/books',bookRouter)




app.listen(PORT, () => console.log(`Server running on Port:${PORT}`))