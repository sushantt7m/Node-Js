const express = require('express')
const router = express.Router();
const {handleGetUser,handleCreateUser,handleGetUserById,handleGetUserByQuery} = require('../controllers/user')

router.route('/user')
    .get(handleGetUser)
    .post(handleCreateUser)

router.route('/user/:id')
    .get(handleGetUserById)

router.route('user/filter/age')
    .get(handleGetUserByQuery)

module.exports = router;