const express = require('express');
const app = express()
const cors = require('cors')
const path = require('path')
const fetch = require('node-fetch');
const bodyParser =  require('body-parser')
var FormData = require('form-data');

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

app.post('/userlogin', (req, res) => {
    const data = req.body;
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.pass);
    formData.append("client_id", "304");
    formData.append("client_secret", "SfJdvJgkW8529mSp7AKBRnB5B2RIjrUaExeS1oia");
    formData.append("provider", "customers");

 
    fetch("http://opsadminstaging.momsbelief.com/api/v1/login", {
        method: 'POST',
        headers: {
            "Accept": "application/json",
        },
        body: formData
    }).then(res => res.json())
    .then(data => {
        console.log(data)
        res.json(data)
    })
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


app.listen( process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000 " + process.env.PORT)
})
