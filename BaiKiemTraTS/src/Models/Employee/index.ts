import { v7 } from "uuid";

export class Employee {
    private _id: string = v7();
    constructor(private _name: string) {}

    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    receiveNoti(message: string): void {
        console.log(
            `${this._id} - ${this._name} received notification: ${message}`,
        );
    }
}
