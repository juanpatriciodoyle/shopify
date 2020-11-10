
const express = require("express")
const connect = require("../../config/dbConnection");
const Container = require("../model/container");
const {toNewRawContainer} = require("../mapper/mapper");
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
    connect.query("SELECT * from container where id = " + req.params.id, (err, rows, fiel) => {
        if (!err) {
            let containers = []
            rows.forEach(x => {
                let container = new Container(x.id, x.data, x.create, x.update, x.category)
                containers.push(container)
            })
            res.send(containers)
        } else res.send(err)
    })
})

router.delete("/", (req, res) => {
    connect.query("DELETE from container")
    connect.query("SELECT * from container", (err, rows, fiel) => {
        if (!err) {
            let datas = []
            rows.forEach(x => {
                let data = new Data(x.id, x.data)
                datas.push(data)
            })
            res.send(datas)
        }
    })
})

router.put("/", (req, res) => {
    let data = new Data(req.body['id'], req.body['data'])
    if (update(data) === true) {
        connect.query("SELECT * from container", (err, rows, fiel) => {
            if (!err) {
                let datas = []
                rows.forEach(x => {
                    let data = new Data(x.id, x.data)
                    datas.push(data)
                })
                res.send(datas)
            }
        })
    } else {
        res.sendStatus(404)
    }
})

router.post("/", (req, res) => {
    let container = toNewRawContainer(req.body['data'], req.body['category']);
    if (save(container) === true) {
        connect.query("SELECT * from container", (err, rows, fiel) => {
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
    connect.query("UPDATE base SET container = '" + data.data + "' WHERE id = " + data.id, (err) => {
        if (err) return err
    })
    return true;
}

module.exports = router