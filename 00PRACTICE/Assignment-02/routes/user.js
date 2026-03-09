const express = require('express');
const { handleGetUsers, handleCreateUsers, handleDeleteUser } = require('../controllers/user')
const router = express.Router();

router.route('/')
    .get(handleGetUsers)
    .post(handleCreateUsers);

router.route('/delete/:id').post(handleDeleteUser);


module.exports = router;