const express = require('express')
const router = express.Router();
const { handleCreateBook,
    handleGetBookById,
    handleDeleteBookById,
    handlePatchBookById,
    handleGetAllBooks } = require('../controllers/books')


router.route('/')
    .post(handleCreateBook)
    .get(handleGetAllBooks)

router.route('/:id')
    .get(handleGetBookById)
    .patch(handlePatchBookById)
    .delete(handleDeleteBookById)







module.exports = router;