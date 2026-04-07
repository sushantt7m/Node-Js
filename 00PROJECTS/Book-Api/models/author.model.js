const { pgTable, varchar, uuid } = require('drizzle-orm/pg-core')


const authorTable = pgTable('authors', {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('firstName', { length: 55 }).notNull(),
    lastName: varchar('lastName', { length: 55 }).notNull(),
    email: varchar('email', { length: 100 }).notNull().unique(),
})

module.exports = authorTable