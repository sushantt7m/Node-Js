const express = require('express')
const mongoose = require('mongoose')
const taskRouter = require('./routes/taskRoutes');
const connectToMongoDB = require('./connection');

const app = express()
const port = 8000





// ----------------------------------------- MIDDLEWARES -----------------------------------
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



// ----------------------------------------- CONNECTION ------------------------------------
connectToMongoDB('mongodb://127.0.0.1:27017/task-database')
    .then(() => console.log("Connected to MongoDb"))
    .catch((err) => console.log("Error:", err))
// ----------------------------------------- ROUTES ----------------------------------------


app.use('/tasks',taskRouter);


// ----------------------------------------- LISTEN ----------------------------------------
app.listen(port, () => console.log(`SERVER STARTED at PORT ${port}`))