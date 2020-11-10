
const express = require("express")
const connect = require("../../config/dbConnection");
const Product = require("../model/product");
const Container = require("../../containerService/model/container");
const {containerToProduct} = require("../mapper/mapper");
const router = express.Router()
const {productToContainer} = require("../mapper/mapper");




router.get("/", (req, res) => {
    connect.query("SELECT * from container", (err, rows) => {
        if (!err) {
            let containerList = []
            rows.forEach(x => {
                let container = new Container(x.id, x.data, x.create, x.update, x.category)
                containerList.push(containerToProduct(container))
            })
            res.send(containerList)
        }
    })
})

// router.get("/:id", (req, res) => {
//
// })

router.get("/:id", (req, res) => {
    connect.query("SELECT * from container where id = " + req.params.id, (err, rows) => {
        if (!err) {
            let product = []
            rows.forEach(x => {
                let container = new Container(x.id, x.data, x.create, x.update, x.category)
                product.push(containerToProduct(container))
            })
            res.send(product)
        } else res.send(err)
    })
})

router.delete("/:id", (req, res) => {
    connect.query("DELETE from container where id = " + req.params.id)
    connect.query("SELECT * from container", (err, rows) => {
        if (!err) {
            let containerList = []
            rows.forEach(x => {
                let container = new Container(x.id, x.data, x.create, x.update, x.category)
                containerList.push(containerToProduct(container))
            })
            res.send(containerList)
        }
    })
})

router.put("/", (req, res) => {
    let product = new Product(req.body.data.cod,req.body.data.name,req.body.data.stock,req.body.data.price)
    let container = productToContainer(product, req.body['category']);
    connect.query("UPDATE container SET data = '" + container.data + "', category = '"+ container.category + "' WHERE id = " + req.body.id, (err) => {
        if (err) res.send(err)
    })
    connect.query("SELECT * from container where id = " + req.body.id, (err, rows) => {
        if (!err) {
            let product = []
            rows.forEach(x => {
                let container = new Container(x.id, x.data, x.create, x.update, x.category)
                product.push(containerToProduct(container))
            })
            res.send(product)
        } else res.send(err)
    })

})

router.post("/", (req, res) => {
    let product = new Product(req.body.data.cod,req.body.data.name,req.body.data.stock,req.body.data.price)
    let container = productToContainer(product, req.body['category']);

    connect.query("INSERT INTO container (data,category) VALUES ("
        + "'" + container.data + "',"
        + "'" + container.category + "'" +
        ")", (err,rows) => {
        if (err) res.send(err)
        connect.query("SELECT * from container where id = " + rows.insertId, (err, rows) => {
            if (!err) {
                let containers = []
                rows.forEach(x => {
                    let container = new Container(x.id, x.data, x.create, x.update, x.category)
                    containers.push(containerToProduct(container))
                })
                res.send(containers)
            } else res.send(err)
        })
    })

})

module.exports = router