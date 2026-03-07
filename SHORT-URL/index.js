const express = require('express');
const urlRouter = require('./routes/url');
const connectToMongoDb = require('./connection');
const URL = require('./models/url')

const app = express();
const port = 8001;
app.use(express.json())

// CONNECTION
connectToMongoDb("mongodb://127.0.0.1:27017/url-db")
    .then(() => console.log("Connected to MongoDb"))
    .catch((err) => console.log(err));

// ROUTES
app.use('/url', urlRouter)
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: { 
                visitHistory: {
                    timestamp:Date.now()
                }, 
            },
        },
    );
    res.redirect(entry.redirectURL)
})


app.listen(port, () => console.log(`Server Started at PORT ${port}`))