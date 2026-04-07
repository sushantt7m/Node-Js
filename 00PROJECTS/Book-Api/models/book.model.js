const { pgTable, varchar, integer, uuid, text } = require("drizzle-orm/pg-core")
const authorTable = require('./author.model')


const bookTable = pgTable('books', {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length: 100 }).notNull(),
    description: text('description'),
    authorId: uuid("authorId").references(() => authorTable.id).notNull(),
})

module.exports = bookTable