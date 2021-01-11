const Container = require("../containerService/model/Container");
const Product = require("./model/Cart");

let add = function (product) {
    let container = new Container()
    container.data = JSON.stringify(product, null, 1)
    return container;
}

let remove = function (id) {
    let data = JSON.parse(container.data)
    return product;
}


exports.add = add
exports.remove = remove
