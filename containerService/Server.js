const bodyParser = require("body-parser");
const express = require('express');
const containerRoutes = require("./route/Container.route")


let app = express()

app.use(bodyParser.json())
app.use('/container', containerRoutes)

exports.createServer = () =>{
    let server = app.listen(4100, function () {
        const port = server.address().port;
        console.log("Example app listening at http://localhost:" + port)
    })
}

app.get('/', function (req, res) {
    res.send('Container main page');
})

