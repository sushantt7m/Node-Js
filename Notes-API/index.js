const express = require('express')
const mongoose = require('mongoose')
const connectMongoDb = require('./connection')
const notesRouter = require('./routes/noteRouter')

const port = 8001;
const app = express();

// ------------------------------------ MIDDLEWARES ---------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// ------------------------------------ CONNCECTION ---------------------------------------
connectMongoDb('mongodb://127.0.0.1:27017/notes-database')
.then(()=>console.log("Connected to MongoDb"))
.catch((err)=>console.log("error",err))


// ----------------------------------- ROUTES----------------------------------------------
// NOTES ROUTE
app.use('/notes',notesRouter);

// LISTENING
app.listen(port,()=>console.log(`Server Started at port ${port}`))