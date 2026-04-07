const express = require('express')
const bookRouter = require('./routes/book.route');
const authorRouter = require('./routes/author.route');

const app = express();
const PORT = 8000


// middleware for json Parsing
app.use(express.json());
app.use('/books', bookRouter)
app.use('/author', authorRouter)



// server 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))