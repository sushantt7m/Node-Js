const URL = require('../models/url')
const {nanoid} = require("nanoid")

async function handleGenerateShortURL(req, res) {
    const body = req.body;

    if(!body.url || !req.body ){
        return res.status(400).json({error:"url is required"});
    }

    const shortID = nanoid(8);
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[]
    })

    return res.json({id:shortID});
}


module.exports = {
    handleGenerateShortURL,
}
