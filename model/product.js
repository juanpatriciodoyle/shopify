
export class Product {
    cod
    name
    stock
    price

    constructor(cod, name, stock, price) {
        this._cod = cod;
        this._name = name;
        this._stock = stock;
        this._price = price;
    }

    get cod() {
        return this._cod;
    }

    set cod(value) {
        this._cod = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get stock() {
        return this._stock;
    }

    set stock(value) {
        this._stock = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }
}