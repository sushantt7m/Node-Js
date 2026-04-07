const { booksTable } = require('../models/book.model')
const db = require('../db/index')
const { eq, ilike } = require('drizzle-orm')

exports.getAllBooks = async function (req, res) {
    // res.setHeader('x-sus',"Sushant kumar")       custom Header
    // res.json(BOOKS);
    const search = req.query.search
    if (search) {
        const books = await db
            .select()
            .from(booksTable)
            .where(ilike(booksTable.title, `%${search}%`))
        return res.json(books);
    }

    const books = await db.select().from(booksTable)
    return res.json(books);
}


exports.getBookById = async function (req, res) {
    const id = req.params.id

    const [book] = await db.select().from(booksTable).where((table) => eq(table.id, id)).limit(1)
    if (!book) return res.status(404).json({ Error: `Book with id ${id} does not exist` })
    res.json(book);
}


exports.createBookById = async function (req, res) {
    const { title, description, authorId } = req.body;

    if (!title || title === '') return res.status(400).json({ error: "title is required" })


    const [result] = await db.insert(booksTable).values({
        title,
        authorId,
        description,
    }).returning({
        id: booksTable.id
    })


    return res.status(201).json({ message: "Book created Successfully", id: result.id })
}


exports.deleteBookById = async function (req, res) {
    const id = (req.params.id);
    await db.delete(booksTable).where(eq(booksTable.id, id))

    return res.status(200).json({ message: `Book with id ${id} deleted successfully` })
}