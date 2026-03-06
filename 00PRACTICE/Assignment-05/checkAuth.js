function checkAuth(req,res,next){
    if(req.query.token === '123'){
        // we will allow
        next();
    }
    else{
        return res.send("UNAUTHORISED");
    }
}

module.exports = checkAuth;