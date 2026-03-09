const User = require('../models/user')

async function handleGetUser(req, res) {
    // getting all the users
    const {age} = req.query;
    
    let users;

    if(age){
        // agar age defined hai to user age se filter hogi
        users = await User.findOne({age:age}) 
    }
    else{
        users = await User.find({})
    }
    return res.status(200).json(users)
}


async function handleCreateUser(req, res) {
    const { name, age } = req.body
    if (!name || !age) return res.status(404).json({ msg: "name and age required" })

    const entry = await User.create({ name: name, age: age })
    return res.status(200).json({ msg: "User Successfully created", user: entry })
}


async function handleGetUserById(req, res) {
    const id = req.params.id
    console.log(id)
    const entry = await User.findById(id)
    if (!entry) return res.status(404).json({ msg: "id not found in database" })
    return res.status(200).json(entry)
}

async function handleGetUserByQuery(req,res){
    const {age} = req.query;
    const entry = await User.findOne({age:age})

    if(!entry){
        return res.status(404).json({msg:"User with this age not found"})
    }

    return res.status(200).json({msg:"Success",Data:entry})
}


module.exports = { handleGetUser, handleCreateUser, handleGetUserById,handleGetUserByQuery }