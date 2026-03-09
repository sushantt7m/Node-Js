const User = require('../models/user')
const {v4:uuidv4} = require('uuid')
const {setUser,getUser} = require('../service/auth')

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.json({ msg: "All three things are required" });
    }
    // with this name, i will create a user
    const entry = await User.create({
        name: name,
        email: email,
        password: password
    })
    return res.render('home')
    // return res.json({ msg: "User entry Succeddfully created", userEntry: entry })
}

async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email:email,password:password})

    
    if(!user){
        return res.render('Login',{
            error:"Invalid Username or Password"
        });
    }
    const sessionId = uuidv4();
    setUser(sessionId,user);
    res.cookie('uid',sessionId);
    return res.redirect('/');
}



module.exports = {
    handleUserSignup,
    handleUserLogin,
}