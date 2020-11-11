
class Cart {
    product
    quantity
    total

    constructor(product, quantity, total) {
        this.product = product;
        this.quantity = quantity;
        this.total = total;
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