const express = require('express')
const app = express()
const port = 3000

app.get('/', require('./routes'))

app.listen(port, () => {
    console.log(`Personal Assignment 1 listening on port ${port}`)
})