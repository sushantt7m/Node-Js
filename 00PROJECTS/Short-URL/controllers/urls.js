const URL = require("../models/url")
const { nanoid } = require("nanoid")



async function handleGetRedirected(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timeStamp: Date.now() } } }
    );

    if (!entry) {
        return res.status(502).send({ msg: "The mapping has not been stored yet" });
    }
    res.redirect(entry.redirectPath)
}


async function handleCreateShortURL(req, res) {
    const body = req.body;
    if (!req.body || !req.body.url) {
        return res.status(401).send({ msg: "Url is required" });
    }

    // we will create short id with the help of nanoid
    const generateShortID = nanoid(8);
    await URL.create({
        shortId: generateShortID,
        redirectPath: body.url,
    })

    return res.json({ shortId: generateShortID, redirectURL: body.url })
}


module.exports = {
    handleGetRedirected,
    handleCreateShortURL,
}