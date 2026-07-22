import type { OrderItem } from "../OrderItem/OrderItem";

export enum OrderStatus {
    NEW = "NEW",

    PAID = "PAID",

    CANCELLED = "CANCELLED",
}

export interface OrderI {
    addItem(item: OrderItem): void;

    removeItem(productId: string): void;

    calculateTotal(): number;

    printInvoice(): void;
}
