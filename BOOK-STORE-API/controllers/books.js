const Book = require('../models/books')



async function handleCreateBook(req, res) {
    const { title, author } = req.body;

    if (!title || !author) return res.status(500).json({ msg: "title and author name required" })

    const book = await Book.create({
        title: title,
        author: author,
    })

    return res.status(201).json({ msg: "Book created", Data: book })
}

async function handleGetAllBooks(req, res) {
    const allBooks = await Book.find({})

    return res.status(201).json(allBooks)
}



// OPERATION BY ID
async function handleGetBookById(req, res) {
    const id = req.params.id;



    try {
        const entry = await Book.findById({ _id: id })
        if (!entry) return res.json({ msg: "Id not found in the database" })
        return res.status(201).json({ msg: "Book fetched", Data: entry })
    }
    catch (error) {
        return res.status(404).json({ msg: "Invalid ID format" })
    }

}


async function handleDeleteBookById(req, res) {
    const id = req.params.id;

    try {
        const entry = await Book.findByIdAndDelete({ _id: id })
        if (!entry) return res.json({ msg: "Id not found in the database" })
        return res.status(201).json({ msg: "Book Deleted", Data: entry })
    }
    catch (error) {
        return res.status(404).json({ msg: "Invalid ID format" })
    }

}

async function handlePatchBookById(req, res) {
    const id = req.params.id;
    const { author } = req.body

    try {
        const entry = await Book.findByIdAndUpdate({ _id: id }, { author: author }, { new: true })
        if (!entry) return res.json({ msg: "Id not found in the database" })
        return res.status(201).json({ msg: "Book Patched", Data: entry })
    }
    catch (error) {
        return res.status(404).json({ msg: "Invalid ID format" })
    }

}


module.exports = { 
    handleCreateBook, 
    handleGetBookById, 
    handleDeleteBookById, 
    handlePatchBookById, 
    handleGetAllBooks };