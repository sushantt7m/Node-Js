const express = require('express')
const userRouter = require('./routes/user')
const { connectMongoDb } = require('./connection')
const { logReqRes } = require('./middlewares')


const app = express();
const port = 8001

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('./log.txt'));

// CONNECTION
connectMongoDb(`mongodb://127.0.0.1:27017/Users-Database`).then(() => console.log("MongoDb connected"));

// ROUTES
app.use('/users', userRouter)




app.listen(port, () => console.log(`Server Started using Port:${port}`))