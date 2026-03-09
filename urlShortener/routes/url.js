const express = require('express');
const mongoose = require('mongoose');

const { handleCreateURL,handleGetRedirected,handleGetAnalytics,handleDeleteUrl } = require('../controllers/url');

const router = express.Router();


router.route('/')
    .post(handleCreateURL)
    
router.route('/:shortid')
    .get(handleGetRedirected)
    .delete(handleDeleteUrl)
    
router.route('/analytics/:shortid')
    .get(handleGetAnalytics)


module.exports = router;