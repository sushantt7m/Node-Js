const express = require('express')
const connectToMongoDb = require('./connection')

const bookRoute = require('./routes/books')

const app = express();
const port = 8001;


// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROUTES
app.use('/books', bookRoute)

// CONNECTTION
connectToMongoDb('mongodb://127.0.0.1:27017/book-store')
    .then(() => console.log("MongoDb Connected"))
    .catch((err) => console.log("ERROR", err))





app.listen(port, () => console.log(`Server started on PORT :${port}`))