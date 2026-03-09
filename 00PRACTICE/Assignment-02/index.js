const express = require('express');
const path = require('path');
const connectToMongoDB = require('./connection');

const userRoute = require('./routes/user')
const staticRoute = require('./routes/staticRouter')

const app = express()
const port = 8001;

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// EJS SETUP
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

// ROUTES
app.use('/users',userRoute)
app.use('/',staticRoute)

connectToMongoDB("mongodb://127.0.0.1:27017/User-mgmt")
.then(()=>console.log("Connected to MongoDb"))
.catch((err)=>console.log("Error:",err))


app.listen(port,()=>console.log(`Server Started at Port:${port}`));