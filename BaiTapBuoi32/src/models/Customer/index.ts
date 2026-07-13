import { CustomerI } from "./type";
import { v7 } from "uuid";

export class Customer implements CustomerI {
    private _id: string = v7();

    constructor(
        private _name: string,
        private _phone: number,
        private _address: string,
    ) {}

    get id(): string {
        return this._id;
    }
    get phone(): number {
        return this._phone;
    }
    get name(): string {
        return this._name;
    }
    get address(): string {
        return this._address;
    }

    set phone(newPhoneNumber: number) {
        this._phone = newPhoneNumber;
    }

    set name(name: string) {
        this._name = name;
    }

    set address(address: string) {
        this._address = address;
    }

    updatePhone(phone: number): void {
        this._phone = phone;
    }

    updateAddress(address: string): void {
        this._address = address;
    }

    toString(): string {
        return `Customer [id=${this._id}, name=${this._name}, phone=${this._phone}, address=${this._address}]`;
    }
}
