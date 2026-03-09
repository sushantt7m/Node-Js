const URL = require('../models/url');
const { nanoid } = require('nanoid');


async function handleCreateURL(req, res) {
    // url from body
    const body = req.body;
    if (!body.url) {
        return res.json({ msg: "URL required for creating shortId" });
    }

    // Checking duplicate URL shortId
    const checkEntry = await URL.findOne({ redirectUrl: body.url });
    if (checkEntry) {
        return res.render('Home', {
            id: checkEntry.shortId
        })
    }

    
    const shortid = nanoid(8);
    const entry = await URL.create({
        shortId: shortid,
        redirectUrl: body.url,
        visitHistory: []
    })
    return res.render('Home', {
        id: entry.shortId
    })
    // return res.status(200).json({ msg: "ShortId Generated Successfully", shortId: entry.shortId })
}


async function handleGetRedirected(req, res) {
    const shortid = req.params.shortid;
    const entry = await URL.findOneAndUpdate(
        { shortId: shortid },
        { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!entry) {
        return res.status(404).json({ msg: "Given shortId does not exists" })
    }
    return res.redirect(entry.redirectUrl);
}


async function handleGetAnalytics(req, res) {
    const shortid = req.params.shortid
    const entry = await URL.findOne({ shortId: shortid });

    if (!entry) {
        return res.status(404).json({ msg: "shortId Does not exists" })
    }

    return res.send(`TotalClicks:${entry.visitHistory.length}`)
}

async function handleDeleteUrl(req, res) {
    const shortid = req.params.shortid

    const entry = await URL.findOneAndDelete({ shortId: shortid })
    if (!entry) {
        return res.status(404).json({ msg: "shortId not found" })
    }
    return res.status(200).json({ msg: "entry successfully deleted", entry: entry })
}






module.exports = {
    handleCreateURL, handleDeleteUrl, handleGetRedirected, handleGetAnalytics
}