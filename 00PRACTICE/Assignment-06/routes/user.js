const express = require('express')
const User = require('../models/user')
const router = express.Router();

const {handleGetAllUsers,handleGetUserById,handlePatchUserById,handleDeleteUserById,handleCreateUser}  = require('../controllers/user')


router.get('/', handleGetAllUsers)


router.route('/:id')
    .get(handleGetUserById)
    .patch(handlePatchUserById)
    .delete(handleDeleteUserById)

router.post('/', handleCreateUser);

module.exports = router;