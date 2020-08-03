const express = require("express")
const connect = require("./../config/dbConnection");
const router = express.Router()


class Data {
    id;
    data;

    constructor(id, data) {
        this.id = id
        this.data = data
    }
}

router.get("/", (req, res) => {
    connect.query("SELECT * from base", (err, rows, fiel) => {
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

router.get("/id", (req, res) => {
    connect.query("SELECT * from base where id = "+req.params.id, (err, rows, fiel) => {
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

router.delete("/", (req, res) => {
    connect.query("DELETE from base")
    connect.query("SELECT * from base", (err, rows, fiel) => {
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
        connect.query("SELECT * from base", (err, rows, fiel) => {
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
    let data = new Data()
    data.data = (req.body['data'])
    if (save(data) === true) {
        connect.query("SELECT * from base", (err, rows, fiel) => {
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

function save(data) {
    connect.query("INSERT INTO base (data) VALUES ('" + data.data + "')", (err) => {
        if (err) return err
    })
    return true;
}

function update(data) {
    connect.query("UPDATE base SET data = '"+data.data+"' WHERE id = "+data.id, (err) => {
        if (err) return err
    })
    return true;
}

module.exports = router




