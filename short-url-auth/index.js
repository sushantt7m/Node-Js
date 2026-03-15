const express = require('express')
const path = require('path')
const connectToMongoDb = require('./connection')

const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')
const urlRoute = require('./routes/url')

const port = 8001;
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// EJS ENGINE SETUP
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))


// ROUTE
app.use('/url',urlRoute);
app.use('/user',userRoute);
app.use('/',staticRoute);

connectToMongoDb('mongodb://127.0.0.1:27017/auth-url')
    .then(() => console.log("Connected to MongoDb"))
    .catch((err) => console.log("ERROR", err))


app.listen(port, () => console.log(`Server Started at Port ${port}`))

