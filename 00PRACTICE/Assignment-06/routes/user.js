const express = require('express')
const User = require('../models/user')
const router = express.Router();

const {handleGetAllUsers,handleGetUserById,handlePatchUserById,handleDeleteUserById}  = require('../controllers/user')


router.get('/', handleGetAllUsers)


router.route('/:id')
    .get(handleGetUserById)
    .patch(handlePatchUserById)
    .delete(handleDeleteUserById)

router.post('/', async (req, res) => {
    const body = req.body

    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: "All Fields Are required" })
    }

    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        job_title: body.job_title,
        gender: body.gender,
    })
    console.log("result", result)

    return res.status(201).json({
        msg: "User created in Database Successfully",
        user: result,
    })
})

module.exports = router;