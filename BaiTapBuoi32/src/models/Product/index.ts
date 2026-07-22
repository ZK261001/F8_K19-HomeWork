import { ProductI } from "./type";
import { v7 } from "uuid";

export class Product implements ProductI {
    private _id: string = v7();

    constructor(
        private _name: string,
        private _price: number,
        private _stock: number,
    ) {}

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get stock(): number {
        return this._stock;
    }

    set stock(stock: number) {
        if (stock < 0) {
            throw new Error("Tồn kho không được để âm");
        }
        this._stock = stock;
    }

    set name(name: string) {
        this._name = name;
    }

    set price(price: number) {
        if (price < 0) {
            throw new Error("Giá không được để âm");
        }
        this._price = price;
    }

    increaseStock(quantity: number): void {
        if (quantity < 0) {
            throw new Error("số lượng không được để âm");
        }

        this._stock += quantity;
    }

    decreaseStock(quantity: number): void {
        if (quantity < 0) {
            throw new Error("số lượng không được để âm");
        }

        if (this._stock - quantity < 0) {
            throw new Error("Không được giảm quá tồn kho");
        }

        this._stock -= quantity;
    }

    toString() {
        return `Product [id=${this._id}, name=${this._name}, price=${this._price}, stock=${this.stock}]`;
    }
}
