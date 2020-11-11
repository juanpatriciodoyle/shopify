const containerService = require('./containerService/Server')
const productService = require('./productService/Server')

containerService.createServer();
productService.createServer();