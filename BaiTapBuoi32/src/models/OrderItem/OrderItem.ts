import type { Product } from "../Product";
import type { OrderItemI } from "./type";

export class OrderItem implements OrderItemI {
    private _price: number;
    constructor(
        private _product: Product,
        private _quantity: number,
    ) {
        this._price = _product.price;
    }

    get price(): number {
        return this._price;
    }

    get product(): Product {
        return this._product;
    }

    get quantity(): number {
        return this._quantity;
    }

    set product(product: Product) {
        this._product = product;
        this._price = product.price;
    }

    set quantity(quantity: number) {
        this._quantity = quantity;
    }
    getTotal(): number {
        return this._price * this._quantity;
    }
}
