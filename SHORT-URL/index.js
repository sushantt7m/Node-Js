const connectToMongoDb = require('./connection');
const express = require('express');
const path = require('path')

const urlRoute = require('./routes/url');
const userRoute = require('./routes/user')
const staticRoute = require('./routes/staticRouter');

const app = express();
const port = 8001;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))

// ROUTES
app.use('/url', urlRoute)
app.use('/user', userRoute)
app.use('/', staticRoute)


// CONNECTION
connectToMongoDb("mongodb://127.0.0.1:27017/url-db")
    .then(() => console.log("Connected to MongoDb"))
    .catch((err) => console.log(err));


// EJS


// SSR
// app.get('/test', async (req, res) => {
//     const allUrls = await URL.find({});
//     // displaying in the Form of HTML(SSR)
//     return res.render('home', {
//         urls: allUrls,
//         name: "Sushant"
//     })
// })



app.listen(port, () => console.log(`Server Started at PORT ${port}`))