const Container = require("../../containerService/model/container");
const Product = require("../model/product");

let productToContainer = function (product, category) {
    let container = new Container()
    container.data = JSON.stringify(product, null, 1)
    container.category = category
    return container;
}

let containerToProduct = function (container) {
    let data = JSON.parse(container.data)
    let product = new Product(data.cod, data.name, data.stock, data.price)
    return product;
}

exports.productToContainer = productToContainer
exports.containerToProduct = containerToProduct
