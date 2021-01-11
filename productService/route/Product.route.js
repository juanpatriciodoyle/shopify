
const express = require("express")
const got = require("got")
const {containerToProduct} = require("../mapper/Mapper");
const router = express.Router()
const url = 'http://localhost:4100/container/'



router.get("/", (req, res) => {
    (async () => {
        try {
            const body = await got.get(url+"/product").json();
            let products = []
            body.forEach(b => {
                products.push(containerToProduct(b))
            })
            res.send(products)
        } catch (error) {
            res.send(error.body)
        }
    })();
})

router.get("/:id", (req, res) => {
        (async () => {
            try {
                const body = await got.get(url+req.params.id).json();
                res.send(containerToProduct(body))
            } catch (error) {
                res.send(error.body)
            }
        })();
})

router.delete("/:id", (req, res) => {
    (async () => {
        try {
            await got.delete(url+req.params.id).json();
        } catch (error) {
            res.sendStatus(400).send(error.body)
        }
    })();
    (async () => {
        try {
            const body = await got.get(url+"/product").json();
            res.send(body)
        } catch (error) {
            res.send(error.body)
        }
    })();
})

router.post("/", (req, res) => {

    (async () => {
        try {
            await got.post(url, {
                json: {
                    "data": {
                        "cod" : req.body.data.cod,
                        "name" : req.body.data.name,
                        "stock" : req.body.data.stock,
                        "price" : req.body.data.price
                    },
                    "category": "product"
                }
            }).json();
        } catch (error) {
            res.send(400).send(error.body)
        }
    })();
})

router.put("/:id", (req, res) => {

    (async () => {
        try {
            await got.put(url+req.params.id, {
                json: {
                    "data": {
                        "cod" : req.body.data.cod,
                        "name" : req.body.data.name,
                        "stock" : req.body.data.stock,
                        "price" : req.body.data.price
                    },
                    "category": "product"
                }
            }).then();
            res.sendStatus(202)
        } catch (error) {
            res.sendStatus(500)
        }
    })();
})


module.exports = router