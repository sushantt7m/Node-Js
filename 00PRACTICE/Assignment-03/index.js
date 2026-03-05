const fs = require('fs');
const express = require('express');
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// GET request on homepage
app.get('/', (req, res) => {
    res.send("Welcome to User API");
})



app.get('/users', async (req, res) => {

    fs.readFile('./users.json','utf-8',(err,data)=>{
        if(err){
            console.log("Error:",err);
        }

        const users = JSON.parse(data);
        res.json(users)
    })
})


app.get('/users/:id',(req,res)=>{
    // console.log(req.url)
    const id = Number(req.params.id);
    // we got id and we will find this id associated data in json file
    // reading file
    fs.readFile('./users.json','utf-8',(err,data)=>{
        if(err){
            return res.status(500).send("error reading the file")
            
        }
        const users = JSON.parse(data)
        const user = users.find((user)=> id === user.id)
        if(!user){
            return res.status(404).send("User Not found in the database")
        }
        res.json(user)
    })
})


app.post('/users',(req,res)=>{

    const newUser = req.body

    fs.readFile('./users.json','utf-8',(err,data)=>{

        const users = JSON.parse(data)

        users.push(newUser)

        fs.writeFile('./users.json',JSON.stringify(users),(err)=>{

            res.json({message:"User added"})

        })

    })

})


app.listen(8000, () => console.log("Server Started"));