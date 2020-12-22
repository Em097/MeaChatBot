const express = require('express');
const cors = require('cors')
const app = express()
const path = require('path')

app.use(cors())

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile( __dirname + '/index.html')
})

app.get('/signin', (req, res) => {
    res.sendFile( __dirname + '/signin.html')
})

app.get('/login', (req, res) => {
    res.sendFile( __dirname + '/login.html')
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})