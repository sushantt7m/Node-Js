const express = require('express')
const { handleGenerateShortURL, handleGetAnalytics, handleGetRedirected } = require('../controllers/url');

const router = express.Router();

router.route('/').post(handleGenerateShortURL);
router.route('/:shortId').get(handleGetRedirected)
router.route('/analytics/:shortId').get(handleGetAnalytics)

module.exports = router;