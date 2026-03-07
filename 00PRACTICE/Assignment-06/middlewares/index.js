const fs = require('fs')
function logReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(
            filename,
            `${Date.now().toLocaleString}: ${req.ip} :${req.path}\n`,
            (err, data) => {
                if (err) return res.status(500).send({ status: "Error Appending file" })
                next();
            }
        )
    }
}


module.exports = {
    logReqRes,
};