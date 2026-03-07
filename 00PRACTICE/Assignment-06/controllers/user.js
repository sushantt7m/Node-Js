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
    const user = await User.findById(req.params.id)
    await User.findByIdAndDelete(req.params.id)
    
    res.status(201).send({Messahe:`User with userId ${req.params.id}, Successfully Deleted`});
}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handlePatchUserById,
    handleDeleteUserById,

}