const Container = require("../model/container");

let toNewRawContainer = function (data, category) {
    let container = new Container()
    container.create = Math.floor(new Date() / 1000)
    container.data = data
    container.category = category
    return container;
}

exports.toNewRawContainer = toNewRawContainer