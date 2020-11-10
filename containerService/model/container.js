
class Container {
    id
    data
    create
    update
    category

    constructor(id, data, create, update, category) {
        this.id = id;
        this.data = data;
        this.create = create;
        this.update = update;
        this.category = category;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    get create() {
        return this._create;
    }

    set create(value) {
        this._create = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

}


module.exports = Container