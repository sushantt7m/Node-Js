const { ilike, eq } = require('drizzle-orm');
const db = require('../db/index')
const authorsTable = require('../models/author.model');
const bookTable = require('../models/book.model');


async function getAllTheAuthors(req, res) {
    // query 
    const searchQuery = req.query.firstName;
    if (searchQuery) {
        const [searchAuthors] = await db.select().from(authorsTable).where(ilike(authorsTable.firstName, `%${searchQuery}%`)).limit(1)
        if (!searchAuthors) {
            return res.status(404).json({ msg: "Author not found" })
        }
        return res.status(200).json(searchAuthors)
    }


    const allAuthors = await db.select().from(authorsTable)
    return res.status(200).json(allAuthors)
}

async function getAllAuthors(req, res) {
    try {
        const id = req.params.id;
        console.log(id)
        const author = await db.select().from(authorsTable).where(eq(authorsTable.id, id))

        if (author.length === 0) {
            return res.status(404).json({ msg: "No author found with the given Id" })
        }
        return res.status(200).json(author)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

// async function getAllBooksOfAuthor(req, res) {
//     try {
//         const id = req.params.id
//         const allBooksByAuthorId = await db.select().from(bookTable).where(eq(bookTable.authorId, id))
//         if (!allBooksByAuthorId) {
//             return res.status(404).json({ msg: `No books found for the id: ${id} ` })
//         }
//         return res.status(200).json(allBooksByAuthorId)
//     } catch (err) {
//         console.log(err)
//         return res.status(500).json({ msg: "Internal Server Error" })
//     }
// }

async function deleteAuthorById(req, res) {
    const id = req.params.id

    const [books] = await db.select().from(bookTable).where(eq(bookTable.authorId, id)).limit(1)
    // if there is no book associated with the id, then only we will delete the author
    if (books) {
        // then dont delete the author
        return res.status(400).json({ msg: "cant delete an author if there is a book associated" })
    }

    const deletedAuthor = await db.delete().from(authorsTable).where(eq(authorsTable.id, id));

    return res.status(200).json({ msg: `Author with id: ${id} deleted Successfully` })
}

module.exports = { getAllTheAuthors, getAllAuthors, deleteAuthorById }