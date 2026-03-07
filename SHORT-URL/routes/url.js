const express = require('express')

const { handleGenerateShortURL,
    handleGetAnalytics,
    handleGetRedirected,
    handleDeleteEntry
} = require('../controllers/url');

const router = express.Router();

router.route('/').post(handleGenerateShortURL);
router.route('/:shortId').get(handleGetRedirected)
router.route('/:shortId').delete(handleDeleteEntry);
router.route('/analytics/:shortId').get(handleGetAnalytics)

module.exports = router;