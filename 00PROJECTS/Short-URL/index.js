const express = require('express');
const mongoose = require('mongoose');
const urlRouter = require('./routes/url')
const connectToMongoDB = require('./connection')

const app = express();
const port = 8003;

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// CONNECTION
connectToMongoDB('mongodb://127.0.0.1:27017/urlShortner')
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.log("Error", err));


// ROUTES
app.use('/url',urlRouter)

app.listen(port,()=>console.log(`Server Started at PORT: ${port}`))
