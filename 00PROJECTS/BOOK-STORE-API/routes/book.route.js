const express = require('express')
const router = express.Router();
const { getAllBooks, getBookById, createBookById, deleteBookById } = require('../controllers/book.controller');
const { loggerMiddleware } = require('../middlewares/logger');


router.route('/')
    .get(getAllBooks)
    .post(createBookById)


router.route('/:id')
    .get(loggerMiddleware, getBookById)
    .delete(loggerMiddleware,deleteBookById)


module.exports = router