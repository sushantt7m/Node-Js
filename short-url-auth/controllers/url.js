const Url = require('../models/url')
const { nanoid } = require('nanoid')

async function handleGetShortId(req, res) {
    const allUrls = await Url.find({});
    // res.render('home',{url:allUrls})
    res.status(200).json(allUrls)
}

async function handleCreateShortId(req, res) {
    const { originalUrl } = req.body
    if (!originalUrl) return res.status(404).json({ msg: "OriginalUrl required" })

    const shortId = nanoid(8)
    const entry = await Url.create({
        shortId: shortId,
        redirectUrl: originalUrl,
        visitHistory: []
    })
    const allUrls = await Url.find({})

    // return res.status(200).json({ msg: "SHORTID created successfullt", Data: entry })
    res.render('Home',{id:entry.shortId,url:allUrls})
}

async function handleDeleteShortId(req, res) {
    const shortId = req.params.shortId;
    const entry = await Url.findOneAndDelete({ shortId: shortId })
    if (!entry) return res.status(404).json({ msg: "Entry doesnot exist for this shortId" })
    return res.status(200).json({msg:"Entry Successfully deleted"})
}
async function handleGetRedirected(req, res) {
    const { shortId } = req.params;

    const entry = await Url.findOne({ shortId: shortId });
    if (!entry) return res.status(404).json({ msg: "entry not found in database" })
    res.redirect(entry.redirectUrl);
}


module.exports = {
    handleGetShortId,
    handleCreateShortId,
    handleDeleteShortId,
    handleGetRedirected
}