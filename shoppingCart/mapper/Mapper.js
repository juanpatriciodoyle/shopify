const Container = require("../../containerService/model/Container");
const Cart = require("../model/Cart");

let cartToContainer = function (product) {
    let container = new Container()
    container.data = JSON.stringify(product, null, 1)
    container.category = 'product'
    return container;
}

let containerToCart = function (container) {
    let cart;
    if (container.data === "new") {
        cart = new Cart(container.id)
    }else{
        let data = JSON.parse(container.data)
        cart = new Cart(data.id, data.product, data.quantity)
    }
    return cart;
}

let containerToCartPrice = function (container, price) {
    let cart;
    if (container.data === "new") {
        cart = new Cart(container.id)
    }else{
        let data = JSON.parse(container.data)
        cart = new Cart(data.id, data.product, data.quantity, price)
    }
    return cart;
}

exports.cartToContainer = cartToContainer
exports.containerToCart = containerToCart
exports.containerToCartPrice = containerToCartPrice
