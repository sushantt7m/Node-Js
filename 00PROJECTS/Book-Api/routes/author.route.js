const express = require('express')
const router = express.Router()

const { getAllTheAuthors, getAllAuthors, deleteAuthorById } = require('../controllers/authors.controller')


router.get('/', getAllTheAuthors)
// router.get('/:id', getAllBooksOfAuthor)
router.get('/:id', getAllAuthors)
router.delete('/:id', deleteAuthorById);






module.exports = router