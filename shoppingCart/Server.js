const bodyParser = require("body-parser");
const express = require('express');
const cartRoutes = require("./route/Cart.route")


let app = express()

app.use(bodyParser.json())
app.use('/cart', cartRoutes)

exports.createServer = () =>{
    let server = app.listen(4300, function () {
        const port = server.address().port;
        console.log("Shopping Cart app listening at http://localhost:" + port)
    })
}

app.get('/', function (req, res) {
    res.send('Cart main page');
})

