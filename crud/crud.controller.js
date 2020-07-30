const model = require('./crud.model')


exports.insert = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
        .update(req.body.data)
        .digest("base64");
    req.body.data = salt + "$" + hash;
    model.createModel(req.body)
        .then((result) => {
            res.status(201).send({id: result.id});
        });
};

exports.getById = (req, res) => {
    console.log("Hi Scammer!")
    // model.findById(req.params.id).then((result) => {
    //     res.status(200).send(result);
    // });
};
