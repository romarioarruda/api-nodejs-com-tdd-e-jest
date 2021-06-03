require('dotenv').config()
const express = require('express')

const app = express()

app.use(express.json())
app.use('/', require('./routes/routesPosts'))
app.use(function(error, req, resp, next) {
    let typeErrors = []
    typeErrors['Post já existe com esse titulo!'] = 409
    typeErrors['Post não encontrado!'] = 404

    if (typeErrors[error.message]) {
        return resp.status(typeErrors[error.message]).send(error.message)
    }

    resp.status(500).send(error.message)
})


const port = 3000
app.listen(port, () => {
    console.log(`Escutando na porta: ${port}`)
})