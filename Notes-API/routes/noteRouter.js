const express = require('express');
const { handleCreateNotes,handleGetNotes,handleGetNoteById,updateNotesById,deleteNotesById } = require('../controllers/noteController');

const router = express.Router();

// HOMEPAGE ROUTE
router.route('/')
    .post(handleCreateNotes)
    .get(handleGetNotes)

router.route('/:id')
    .get(handleGetNoteById)
    .patch(updateNotesById)
    .delete(deleteNotesById)


module.exports = router;