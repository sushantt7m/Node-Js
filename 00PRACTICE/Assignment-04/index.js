const fs = require('fs')
const express = require('express')

const app = express();
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    // we will read data from users.json and then send the res
    res.send("Homepage")
})


app.get('/users', (req, res) => {
    // we will read data from users.json and then send the res
    fs.readFile('./users.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send("Error Reading data");
        }

        const users = JSON.parse(data);
        res.json(users)
    })
})

app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    // we will read file and find the object associated with that id
    fs.readFile('./users.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send({ msg: "Cannot read File" });
        }

        const users = JSON.parse(data);

        const user = users.find((user)=>id===user.id)

        if (!user) {
            return res.status(404).send("User not found")
        }
        res.json(user)
    })
})


app.post('/users',(req,res)=>{
    // request coming from post man 
    // will be pushed into my database
    // user.js
    const newUsers = {...req.body,id:Number(req.body.id)}

    // now we will read file and then push into the user.json
    fs.readFile('./users.json','utf-8',(err,data)=>{
        if(err){
            return res.status(500).send("Cannot read file");
        }

        // agar error nahi mila to yahan pe kaam krebeg
        const users = JSON.parse(data)
        users.push(newUsers)

        // now we will write
        fs.writeFile('./users.json',JSON.stringify(users),(err)=>{
            if(err){
                return res.status(500).send({msg:"Cannot write file"});
            }
            res.send({msg:"POST Success"})
        })
    })
})


// update user on specific id
app.patch('/users/:id',(req,res)=>{
    // pehle to hm reead krenge filese
    const id = Number(req.params.id)

    // ab iss id ke corresponding operations chalayenge
    fs.readFile('./users.json','utf-8',(err,data)=>{
        if(err){
            return res.status(500).send({msg:"Error reading file"})
        }

        // now we will find this id and update the value
        const users = JSON.parse(data);
        const userIndex =  users.findIndex((user)=>user.id === id)
        users[userIndex].age = req.body.age;
        fs.writeFile('./users.json',JSON.stringify(users),(err)=>{
            if(err){
                return res.status(503).send({msg:"Cannot update"});
            }
            res.send({msg:"PATCHING SUCCESS"});
        })
    })
})


app.delete('/users/:id',(req,res)=>{
    const id = Number(req.params.id);

    fs.readFile('./users.json','utf-8',(err,data)=>{
        if(err){
            res.status(501).send("Error Reading from User.json")
        }

        const users = JSON.parse(data);
        const filteredUsers = users.filter((user)=>user.id!==id); 

        // now write this into json file
        fs.writeFile('./users.json',JSON.stringify(filteredUsers),(err)=>{
            if(err){
                res.status(503).send({msg:"There was error writing in user.json"})
            }

            res.send("User Deleted Successfully");
        })
    })

})


app.listen(8000, () => console.log("Server Started"));