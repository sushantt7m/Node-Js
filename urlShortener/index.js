const express = require('express');
const connectMongoDb = require('./connection');
const path = require('path');
const cookieParser = require('cookie-parser')
const { restrictToLoggedInUserOnly } = require('./middlewares/auth')

const urlRoute = require('./routes/url');
const userRoute = require('./routes/user')
const staticRoute = require('./routes/staticRouter');


const app = express();
const port = 8001;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))


app.use('/url', restrictToLoggedInUserOnly, urlRoute)
app.use('/user', userRoute)
app.use('/', staticRoute)



// CONNECTION

connectMongoDb('mongodb://127.0.0.1:27017/url-shortener')
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.log("ERROR", err));



app.listen(port, () => console.log(`Server started at PORT: ${port}`))
