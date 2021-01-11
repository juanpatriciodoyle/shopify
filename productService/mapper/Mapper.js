const Container = require("../../containerService/model/Container");
const Product = require("../model/Product");

let productToContainer = function (product) {
    let container = new Container()
    container.data = JSON.stringify(product, null, 1)
    container.category = 'product'
    return container;
}

let containerToProduct = function (container) {
    let data = JSON.parse(container.data)
    let product = new Product(data.cod, data.name, data.stock, data.price)
    return product;
}

exports.productToContainer = productToContainer
exports.containerToProduct = containerToProduct
