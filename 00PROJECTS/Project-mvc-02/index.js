const express = require('express');
const { connectMongoDb } = require('./connection');
const  logReqRes  = require('./middlewares');
const userRouter = require('./routes/user');

const app = express();
const port = 8000;

// CONNECTION
connectMongoDb('mongodb://127.0.0.1:27017/my-db');

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('log.txt'));

// ROUTES
app.use('/api/users', userRouter);

app.listen(port, () => console.log(`Server started at port ${port}`));