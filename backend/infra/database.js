const pgp = require('pg-promise')()

const db = pgp({
    user: 'postgres',
    password: '',
    host: '127.0.0.1',
    port: 5432,
    database: 'blog'
})

module.exports = db