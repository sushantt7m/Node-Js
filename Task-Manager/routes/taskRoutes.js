const express = require('express');
const router = express.Router();
const { handleCreateTask, handleGetTask,handleGetTaskById,handleUpdateById,handleDeleteTask } = require('../controllers/taskController')


router.route('/')
    .get(handleGetTask)
    .post(handleCreateTask)



router.route('/:id')
    .get(handleGetTaskById)
    .patch(handleUpdateById)
    .delete(handleDeleteTask);


module.exports = router;