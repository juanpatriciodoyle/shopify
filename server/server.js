const connect = require("./../config/dbConnection");
const bodyParser = require("body-parser");
const express = require('express');
const data = require("./../model/data")


let app = express()

app.use(bodyParser.json())
app.use('/data', data)

exports.createServer = () =>{
    let server = app.listen(4200, function () {
        const port = server.address().port;
        console.log("Example app listening at http://localhost:" + port)
    })
}

app.get('/', function (req, res) {
    res.send('server main page');
})

