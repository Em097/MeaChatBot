const express = require('express');
const app = express()
const cors = require('cors')
const path = require('path')
const fetch = require('node-fetch');
const bodyParser =  require('body-parser')

require('dotenv').config()


app.use(cors());

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.sendFile( __dirname + '/index.html')  
})

app.get('/signin',(req, res) => {   
    res.sendFile( __dirname + '/signin.html')
})

app.get('/login', (req, res) => {
    res.sendFile( __dirname + '/login.html')
})


app.post('/user', (req, res) => {

    const data = req.body;
       fetch("http://opsadminstaging.momsbelief.com/api/v1/acl/default-org-location-dept",{
            method: 'GET',
            headers: {
               "Accept": "application/json",
               'Authorization': 'Bearer ' + data.Access
              },
              
        }).then(data => data.json())
        .then(data => res.json(data))
})

app.post('/child', (req, res) => {

    const data = req.body;
    console.log(data)
       fetch("http://opsadminstaging.momsbelief.com/api/v1/child-profiles",{
            method: 'GET',
            headers: {
               "Accept": "application/json",
               'Authorization': 'Bearer ' + data.Access,
               "Organization-Id": data.orgId,
               "Location-Id": data.locId
              },
              
        }).then(data => data.json())
        .then(data => res.json(data))
})


app.listen(3000 || process.env.PORT, () => {
    console.log("Server is running on port 3000 " + process.env.PORT)
})
