const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose')
// const users = require('./MOCK_DATA.json');


const app = express();
const port = 8000

// Connection 
mongoose.connect('mongodb://127.0.0.1:27017/Sushant_dataBase')
    .then(() => console.log("Mongodb Connected"))
    .catch((err) => console.log("Mongo Error", err))

// SCHEMA
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
})

// user -> model name
const User = mongoose.model('user', userSchema);

// MIDDLEWARE PLUGIN -> makes the req.body defined
app.use(express.urlencoded({ extended: false }))

// app.use((req, res, next) => {
//     console.log("Hello from MIDDLEWARE1");
//     next();
// })

// app.use((req, res, next) => {
//     console.log("Hello from MIDDLEWARE 2");
//     return res.end("Hey");
//     // next();
// })

// ROUTES
//SSR->Server Side Rendering
app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`

    res.send(html);
})


// RESTAPI
app.get('/api/users', (req, res) => {
    return res.json(users)
})


app.post('/api/users', async (req, res) => {
    // TODO : creates new user
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })


    return res.status(201).json({ msg: "Success" })





    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //     return res.json({ Status: "Success", id: users.length })
    // })
})


// merged the same routes(The commented out part has been merged out from above below)

app.route('/api/users/:id')
    .get((req, res) => {
        // gets the user with id
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id)
        return res.json(user);
    })
    .patch((req, res) => {
        //  TODO : Edits the user with id
        // first of all we will find the id
        const id = Number(req.params.id)
        const body = req.body;
        console.log(body);

        // first of all we will find if the id exists the jsonFile  or not
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ message: "user not found" });
        }

        users[userIndex] = { ...users[userIndex], ...body };
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            return res.json({ Status: "Success", updatedUser: users[userIndex] });
        })
    })
    .delete((req, res) => {
        // TODO : deletes user with id
        return res.json({ Status: "Pending" })
    })

app.listen(port, () => console.log(`Server Started at Port:${port}`))