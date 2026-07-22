import type { Customer } from "../../models/Customer";
import type { Order } from "../../models/Order/Order";

export interface OrderServiceI {
    createOrder(customer: Customer): void;
    addProduct(orderId: string, productId: string, quantity: number): void;
    removeProduct(orderId: string, productId: string): void;
    checkout(orderId: string): void;
    cancelOrder(orderId: string): void;
    findOrder(orderId: string): Order | undefined;
    getOrders(): Order[];
    printOrders(): void;
}
