require('dotenv').config()
const express = require('express')

const app = express()

app.use(express.json())
// app.use(express.urlencoded({ extends: true }))

app.use('/', require('./routes/routesPosts'))


const port = 3000
app.listen(port, () => {
    console.log(`Escutando na porta: ${port}`)
})