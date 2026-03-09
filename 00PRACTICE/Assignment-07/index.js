const express = require('express');
const path = require('path')
const router = require('./routes/user')
const mongoose = require('mongoose')
const connectToMongoDb = require('./connection')

const port = 8001;
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


// EJS SETUP
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))



// ROUTES
app.use('/api',router)



// CONNECTION
connectToMongoDb('mongodb://127.0.0.1:27017/users-database')
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Error:", err))

app.listen(port, () => console.log(`ServerStarted at PORT: ${port}`))