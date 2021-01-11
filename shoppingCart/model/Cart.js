
class Cart {
    id
    product
    quantity
    total

    constructor(id, product, quantity, total) {
        this.product = product;
        this.quantity = quantity;
        this.total = total;
        this.id = id;
    }

    set id(value) {
        this.id = value;
    }

    get id() {
        return this.id;
    }

    set product(value) {
        this._product = value;
    }

    get product() {
        return this._product;
    }

    get quantity() {
        return this._quantity;
    }

    get total() {
        return this._total;
    }
}

module.exports = Cart