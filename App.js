const containerService = require('./containerService/Server')
const productService = require('./productService/Server')
const cartService = require('./shoppingCart/Server')

containerService.createServer();
productService.createServer();
cartService.createServer();