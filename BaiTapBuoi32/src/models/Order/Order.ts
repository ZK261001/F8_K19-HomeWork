import { v7 } from "uuid";
import { OrderItem } from "../OrderItem/OrderItem";
import { Customer } from "../Customer";
import { OrderStatus, type OrderI } from "./type";

export class Order implements OrderI {
    private _id: string = v7();
    private _items: OrderItem[] = [];
    private _createdAt: Date = new Date();

    private _status: OrderStatus = OrderStatus.NEW;
    constructor(private _customer: Customer) {}

    get id(): string {
        return this._id;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get status(): OrderStatus {
        return this._status;
    }

    set status(status: OrderStatus) {
        this._status = status;
    }

    addItem(item: OrderItem) {
        const existingItem = this._items.find(
            (i) => i.product.id === item.product.id,
        );

        if (existingItem) {
            existingItem.quantity += item.quantity;
            return;
        }

        this._items.push(item);
    }

    removeItem(productId: string) {
        this._items = this._items.filter(
            (item) => item.product.id !== productId,
        );
    }

    calculateTotal() {
        return this._items.reduce((total, item) => total + item.getTotal(), 0);
    }

    printInvoice() {
        console.log(`Invoice for Order: ${this._id}`);
        console.log(`Customer: ${this._customer.name}`);
        console.log(`Created at: ${this._createdAt}`);

        this._items.forEach((item) => {
            console.log(
                `- ${item.product.name} x ${item.quantity}: $${item.getTotal().toFixed(2)}`,
            );
        });

        console.log(`Total: $${this.calculateTotal().toFixed(2)}`);
    }
}
