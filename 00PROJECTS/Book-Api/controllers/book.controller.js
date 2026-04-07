// we need a database to query on
const db = require('../db/index.js')
const bookTable = require('../models/book.model')

const { eq, ilike } = require('drizzle-orm')


async function getAllBooks(req, res) {
    try {
        // using query as a search parameters
        const search = req.query.search
        if (search) {
            const foundBooks = await db.select().from(bookTable).where(ilike(bookTable.title, `%${search}%`))
            return res.status(200).json(foundBooks)
        }

        const allBooks = await db.select().from(bookTable);
        return res.status(200).json(allBooks);
    } catch (err) {
        console.log(err);
        return res.status(404).json({ msg: "Error Getting Book" })
    }
}

async function getBookById(req, res) {
    try {
        const { id } = req.params

        const [book] = await db.select().from(bookTable).where(eq(bookTable.id, id)).limit(1)

        if (!book) {
            return res.status(404).json({ msg: "User not found" })
        }

        return res.status(200).json(book)

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

async function createBookRecord(req, res) {
    const { title, description, authorId } = req.body

    const record = await db.insert(booksTable).values({
        title, authorId, description
    }).returning();

    return res.status(200).json({ msg: "Book updated", id: record[0].id })
}

async function deleteBookRecord(req, res) {
    const {id} = req.params
    await db.delete(bookTable).where(eq(bookTable.id,id))

    return res.status(200).json({
        msg:`Book with id ${id} successfully delete`
    })
}


module.exports = { getAllBooks, getBookById, createBookRecord, deleteBookRecord }