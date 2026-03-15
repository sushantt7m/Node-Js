const express = require('express')
const {handleGetShortId, handleCreateShortId, handleDeleteShortId, handleGetRedirected } = require('../controllers/url');
const { get } = require('mongoose');
const router = express.Router();


router.route('/')
    .get(handleGetShortId)
    .post(handleCreateShortId)

router.route('/:shortId')
    .get(handleGetRedirected)
    .delete(handleDeleteShortId)




module.exports = router