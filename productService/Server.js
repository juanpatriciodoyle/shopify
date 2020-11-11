const bodyParser = require("body-parser");
const express = require('express');
const productRoutes = require("./route/Product.route")


let app = express()

app.use(bodyParser.json())
app.use('/product', productRoutes)

exports.createServer = () =>{
    let server = app.listen(4200, function () {
        const port = server.address().port;
        console.log("Example app listening at http://localhost:" + port)
    })
}

app.get('/', function (req, res) {
    res.send('Product main page');
})

