const User = require('../model/user')


async function handleGetUsers(req, res) {
    const allDbUsers = await User.find({});
    res.render('usersTable', {
        users: allDbUsers,
    })
}


async function handleCreateUsers(req, res) {
    const { name, age } = req.body;

    if (!name || !age) return res.json({ msg: "Both name and age required" })

    const entry = await User.findOne({name})
    if(entry){
        return res.json({msg:"User with this name already Exists"})
    }

    await User.create({
        name: name,
        age: age
    })

    return res.redirect('/users');

}

async function handleDeleteUser(req,res){
    const id = req.params.id
    await User.findByIdAndDelete(id);
    res.redirect('/users')
}



module.exports = {
    handleGetUsers,
    handleCreateUsers,
    handleDeleteUser,
}