const containerService = require('./containerService/Server')
const productService = require('./productService/Server')
const cartService = require('./shoppingCart/Server')

containerService.createServer();
productService.createServer();
cartService.createServer();


var express = require('express');
const bodyParser = require('body-parser')
var mercadopago = require('mercadopago');
const got = require("got")
const url = 'http://localhost:4300/cart/pay/'


mercadopago.configurations.setAccessToken('TEST-3807644253514008-071521-4c183e0e3b4789476abe3ec9eac45569-221030409');

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: true}))

app.post('/procesar_pago', function (req, res) {
    console.log('Start checkout!')
    let id = req.body.description;


    //Got
    (async () => {
        try {
            await got.get(url + id).json();
        } catch (error) {
            console.log("error")
        }
    })().then(value => {

            var payment_data = {
                transaction_amount: parseFloat("500"),
                token: req.body.token,
                installments: parseInt("1"),
                payer: {
                    email: req.body.email,
                }
            };

            mercadopago.payment.create(payment_data).then(function (data) {
                console.log("Pago Exitoso: ", data);
                res.sendStatus(200)
            }).catch(function (error) {
                console.log("Error: ", error)
                res.sendStatus(400)

            })
        }
    );
    //Got


});


app.listen(port, () => console.log(`Meli app listening at http://localhost:${port}`, 'Front: http://localhost:63342/mercadoPagoTest/views/frontend.html'))
