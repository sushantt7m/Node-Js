const express = require('express');
const path = require('path')
const urlRouter = require('./routes/url');
const connectToMongoDb = require('./connection');
const URL = require('./models/url')
const staticRoute = require('./routes/staticRouter');

const app = express();
const port = 8001;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))

// CONNECTION
connectToMongoDb("mongodb://127.0.0.1:27017/url-db")
    .then(() => console.log("Connected to MongoDb"))
    .catch((err) => console.log(err));

// ROUTES
app.use('/url', urlRouter)
app.use('/', staticRoute)


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