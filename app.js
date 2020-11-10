const containerService = require('./containerService/server')
const productService = require('./productService/server')

containerService.createServer();
productService.createServer();