const Model = new Schema({
    data: String,
    id: Number
});


exports.createModel = (modelData) => {
    let newModel = new Model(modelData);
    return newModel.save();
};

exports.findById = (id) => {
    return Model.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};

