//const API_KEY = 'b71e6267222964bd7b2a6674914ff300-us14'


// DEPENDENCIES
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https')
const request = import('got');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))

// REQUEST and RESPONCE
app.get( '/', (req, res) => {

    res.sendFile(__dirname + '/signup.html')

})

app.post('/', (req, res) => {

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const userEmail = req.body.email;

    const data = {
        members: [
            {
                email_address: userEmail,
                status: "subscribed",
                merge_fields:  {
                    FNAME: firstName,
                    LNAME: lastName
                },
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = 'https://us14.api.mailchimp.com/3.0/lists/49926afc36';

    const options = {
        method: 'POST',
        auth: 'srgi1:b71e6267222964bd7b2a6674914ff300-us14'
    }

    const request = https.request(url, options, function(responce) {

        if (responce.statusCode === 200){
            res.send("Successfully subscribed!")
        } else {
            res.send("Something goes wrong, try again!")
        }

        responce.on('data', function(data) {
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData);
    request.end()
})


// PORT
app.listen(port, () => {

    console.log(`PORT ${port} running...`)

})



