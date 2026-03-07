const express = require("express");
const URL = require("../models/url");
const { nanoid } = require("nanoid");
const router = express.Router();
const { handleCreateShortURL, handleGetRedirected } = require('../controllers/urls')

router.route('/')
    .post(handleCreateShortURL);

router.route('/:shortId')
    .get(handleGetRedirected);

module.exports = router;