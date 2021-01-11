const Container = require("../model/Container");

let toContainer = function (data, category) {
    let container = new Container()
    container.create = Math.floor(new Date() / 1000)
    container.data = JSON.stringify(data, null, 1)
    container.category = category
    return container;
}

let payToContainer = function (data, category) {
    let container = new Container()
    container.create = Math.floor(new Date() / 1000)
    container.data = JSON.stringify(data, null, 1)
    container.category = category
    container.id = data.id
    return container;
}

let cartToContainer = function (data, category) {
    let container = new Container()
    container.create = Math.floor(new Date() / 1000)
    container.data = data
    container.category = category
    return container;
}

exports.toContainer = toContainer
exports.cartToContainer = cartToContainer
exports.payToContainer = payToContainer