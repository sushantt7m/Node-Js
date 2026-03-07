const User = require("../models/user");

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).send({ msg: "User Not found in the Database" })

    return res.json(user);
}
async function handlePatchUserById(req, res) {
    const updatedObject = req.body;

    await User.findByIdAndUpdate(req.params.id, { last_name: `${updatedObject.last_name}` })
    return res.json({ msg: "Success updating" })
}
async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id)

    res.status(201).send({ Messahe: `User with userId ${req.params.id}, Successfully Deleted` });
}

async function handleCreateUser(req, res) {
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
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handlePatchUserById,
    handleDeleteUserById,
    handleCreateUser,
}