const express = require("express")
const got = require("got")
const {containerToCart} = require("../mapper/Mapper");
const router = express.Router()
const url = 'http://localhost:4100/container/'
const urlProduct = 'http://localhost:4200/product/'


router.get("/", (req, res) => {
    (async () => {
        try {
            const body = await got.get(url + "/cart").json();
            let products = []
            body.forEach(b => {
                products.push(containerToCart(b))
            })
            res.send(products)
        } catch (error) {
            res.send(error.body).sendStatus(400)
        }
    })();
})

router.get("/:id", (req, res) => {
    (async () => {
        try {
            const body = await got.get(url + req.params.id).json();
            res.send(containerToCart(body))
        } catch (error) {
            res.send(error.body)
        }
    })();
})

router.get("/total/:id", async (req, res) => {
    let body;
    await (async () => {
        body = await got.get(url + req.params.id).json();
        body = containerToCart(body)
    })();

    let products = body.product
    let quantities = body.quantity
    let price = 0

    let productsNumbers = products.split`,`.map(x => +x)
    let quantitiesNumbers = quantities.split`,`.map(x => +x)
    for (let i = 0; i < productsNumbers.length; i++) {
        await (async () => {
            body = await got.get(urlProduct + productsNumbers[i].toString()).json();
            price += body.price * quantitiesNumbers[i];
        })();
    }

    res.send(price.toString())

})

router.get("/pay/:id", (req, res) => {

    let body;

    (async () => {
        try {
            body = await got.get(url + req.params.id).json();
            body = containerToCart(body);

            await (async () => {
                try {
                    await got.put(url + req.params.id, {
                        json: {
                            "data": {
                                "product": body.product,
                                "quantity": body.quantity
                            },
                            "category": "paid cart"
                        }
                    }).then();
                    res.sendStatus(202)
                } catch (error) {
                    res.sendStatus(500)
                }
            })()

        } catch (error) {
            res.send(error.body)
        }
    })().then();



    });


router.delete("/:id", (req, res) => {
    (async () => {
        try {
            await got.delete(url + req.params.id).json();
        } catch (error) {
            res.sendStatus(400).send(error.body)
        }
    })();
    (async () => {
        try {
            const body = await got.get(url + "/cart").json();
            res.send(body)
        } catch (error) {
            res.send(error.body)
        }
    })();
})

router.post("/", (req, res) => {

    if (req.body.data.id === undefined) {
        (async () => {
            try {
                await got.post(url, {
                    json: {
                        "data": "new",
                        "category": "cart"
                    }
                }).json();
                res.sendStatus(200)
            } catch (error) {
                res.sendStatus(400).send(error.body)
            }
        })();
    }

})

router.put("/:id", (req, res) => {
    let products = req.body.data.product
    let quantities = req.body.data.quantity;

    (async () => {
        try {
            await got.put(url + req.params.id, {
                json: {
                    "data": {
                        "product": products,
                        "quantity": quantities
                    },
                    "category": "cart"
                }
            });
            res.sendStatus(202)
        } catch (error) {
            res.sendStatus(400)
        }
    })();
})


module.exports = router