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
        if (err) return res.status(501).send("Error Reading Database");

        const users = JSON.parse(data);
        res.json(users);
    })
})

app.post('/users', (req, res) => {
    fs.readFile('./users.json', 'utf-8', (err, data) => {
        if (err) return res.status(502).send("Error reading the File", err);

        const users = JSON.parse(data)
        const index = users.length
        const newUsers = {
            id: index + 1,
            ...req.body
        }

        users.push(newUsers)

        // now feed this updated Users to the database
        fs.writeFile('./users.json', JSON.stringify(users), (err) => {
            if (err) return res.status(501).send("Error Writing in file", err);
            res.send("User Added Successfully")
        })
    })
})


// PATCHING
app.patch('/users/:id', (req, res) => {

    const id = Number(req.params.id);

    fs.readFile('./users.json', 'utf-8', (err, data) => {

        if (err) return res.status(500).send("Error reading database");

        const users = JSON.parse(data);

        const userIndex = users.findIndex(user => user.id === id);
        const user = users.find((u)=>u.id === id);
        if (userIndex === -1) {
            return res.status(404).send("User not found");
        }

        for(let key in req.body){
            user[key] = req.body[key]
        }

        fs.writeFile('./users.json', JSON.stringify(users, null, 2), (err) => {

            if (err) return res.status(500).send("Error writing file");

            res.send(users[userIndex]);
        });

    });

});


app.get('/admin',checkAuth,(req,res)=>{
    res.send("Welcome to Admin Panel");
})




// creating GET POST ROUTES

app.listen(port, () => console.log(`Server Started at port ${port}`));
