const express = require('express')
const { getAllBooks, getBookById, createBookRecord, deleteBookRecord } = require('../controllers/book.controller');

const router = express.Router()

router.get('/', getAllBooks)
router.get('/:id', getBookById);
router.delete('/:id', deleteBookRecord);
router.post('/',createBookRecord)



module.exports = router