const fs = require('fs')
const express = require("express")
const logger = require('./loggerMiddleware')
const checkAuth = require('./checkAuth')



const port = 8000
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger);


app.get('/', (req, res) => {
    res.send("HOMEPAGE")
})

app.get('/users', (req, res) => {
    fs.readFile('./users.json', 'utf-8', (err, data) => {
        if (err) return res.status(501).send({"Error":"Error Reading Database"});

        const users = JSON.parse(data);
        res.json(users);
    })
})

app.post('/users', (req, res) => {
    fs.readFile('./users.json', 'utf-8', (err, data) => {
        if (err) return res.status(502).send({"Error":"Error reading the File"});

        const users = JSON.parse(data)
        const index = users.length
        const newUsers = {
            id: index + 1,
            ...req.body
        }

        users.push(newUsers)

        // now feed this updated Users to the database
        fs.writeFile('./users.json', JSON.stringify(users), (err) => {
            if (err) return res.status(501).send({"ERROR":"cannot read database"});
            res.send({message:"User Added Successfully",data:newUsers})
        })
    })
})


// PATCHING
app.patch('/users/:id', (req, res) => {

    const id = Number(req.params.id);

    fs.readFile('./users.json', 'utf-8', (err, data) => {

        if (err) return res.status(500).json({error:"Error reading database"});

        const users = JSON.parse(data);

        const user = users.find(u => u.id === id);

        if(!user){
            return res.status(404).json({error:"User not found"})
        }

        for(let key in req.body){
            user[key] = req.body[key]
        }

        fs.writeFile('./users.json', JSON.stringify(users, null, 2), (err) => {

            if (err) return res.status(500).json({error:"Cannot write to file"});

            res.json({
                message:"Data patched successfully",
                data:user
            });

        });

    });

});

app.get('/admin',checkAuth,(req,res)=>{
    res.send("Welcome to Admin Panel");
})




// creating GET POST ROUTES

app.listen(port, () => console.log(`Server Started at port ${port}`));
