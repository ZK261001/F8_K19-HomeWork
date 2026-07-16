import { v7 } from "uuid";

export class Customer {
    private _id: string = v7();
    constructor(
        private _name: string,
        private _tax: string,
        private _address: string,
    ) {}

    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get tax() {
        return this._tax;
    }
    get address() {
        return this._address;
    }

    set name(name: string) {
        this._name = name;
    }

    set address(address: string) {
        this._address = address;
    }
    set tax(tax: string) {
        this._tax = tax;
    }
}
