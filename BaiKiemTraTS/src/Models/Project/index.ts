import { v7 } from "uuid";

export class Project {
    private _id: string = v7();
    constructor(
        private _customerId: string,
        private _employeeId: string,
    ) {}

    get id() {
        return this._id;
    }
    get customerId() {
        return this._customerId;
    }
    get employeeId() {
        return this._employeeId;
    }

    set customerId(customerId: string) {
        this._customerId = customerId;
    }

    set employeeId(employeeId: string) {
        this._employeeId = employeeId;
    }
}
