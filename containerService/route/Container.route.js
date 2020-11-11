const express = require("express")
const connect = require("../../config/dbConnection");
const Container = require("../model/Container");
const {containerToProduct} = require("../../productService/mapper/Mapper");
const {toContainer} = require("../mapper/Mapper");
const router = express.Router()


router.get("/", (req, res) => {
    connect.query("SELECT * from container", (err, rows) => {
        if (!err) {
            let containerList = []
            rows.forEach(x => {
                let container = new Container(x.id, x.data, x.create, x.update, x.category)
                containerList.push(container)
            })
            res.send(containerList)
        }
    })
})

router.get("/:id", (req, res) => {
    if (isNumeric(req.params.id)) {
        connect.query("SELECT * from container where id = " + req.params.id, (err, rows) => {
            if (!err) {
                let container = "Not found";
                rows.forEach(x => {
                    container = new Container(x.id, x.data, x.create, x.update, x.category)
                })
                res.send(container)
            } else res.send(err)
        })
    } else {
        connect.query("SELECT * from container where category = '" + req.params.id + "'", (err, rows) => {
            if (!err) {
                let containers = []
                rows.forEach(x => {
                    let container = new Container(x.id, x.data, x.create, x.update, x.category)
                    containers.push(container)
                })
                res.send(containers)
            } else res.send(err)
        })
    }
})

router.delete("/:id", (req, res) => {
    connect.query("DELETE from container where id= " + req.params.id)
})

router.put("/:id", (req, res) => {
    let data = toContainer(req.body['data'], req.body['category'])
    data.id = req.params.id
    if (update(data) === true) {
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
})

router.post("/", (req, res) => {
    let container = toContainer(req.body['data'], req.body['category']);
    if (save(container) === true) {
        connect.query("SELECT * from container", (err, rows) => {
            if (!err) {
                let containers = []
                rows.forEach(x => {
                    let container = new Container(x.id, x.data, x.create, x.update, x.category)
                    containers.push(container)
                })
                res.send(containers)
            }
        })
    } else {
        res.sendStatus(404)
    }
})

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) &&
        !isNaN(parseFloat(str))
}

function save(container) {
    connect.query("INSERT INTO container (data,category) VALUES ("
        + "'" + container.data + "',"
        + "'" + container.category + "'" +
        ")", (err) => {
        if (err) {
            return err
        } else return true;
    })
}

function update(data) {
    connect.query("UPDATE container SET data = '" + data.data + "' WHERE id = " + data.id, (err) => {
        if (err) return false
    })
    return true;
}

module.exports = router