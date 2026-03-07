const express = require('express')
const {handleGenerateShortURL} = require('../controllers/url');

const router = express.Router();

router.route('/').post(handleGenerateShortURL);

module.exports = router;