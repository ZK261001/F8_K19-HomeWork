import { Customer } from "../../models/Customer";
import { Order, OrderStatus } from "../../models/Order/Order";
import { OrderItem } from "../../models/OrderItem/OrderItem";
import { ProductServiceI } from "../ProductService";

export class OrderService {
    private _orders: Order[] = [];

    constructor(private productService: ProductServiceI) {}

    createOrder(customer: Customer): void {
        const order = new Order(customer);
        this._orders.push(order);
    }

    addProduct(orderId: string, productId: string, quantity: number): void {
        const order = this.findOrder(orderId);
        if (!order) {
            throw new Error(`Không tìm thấy Order với id ${orderId}`);
        }
        const product = this.productService.findById(productId);
        if (!product) {
            throw new Error(`Không tìm thấy Product với id ${productId}`);
        }

        const orderItem = new OrderItem(product, quantity);
        order.addItem(orderItem);
    }

    removeProduct(orderId: string, productId: string): void {
        const order = this.findOrder(orderId);
        if (!order) {
            throw new Error(`Không tìm thấy Order với id ${orderId}`);
        }

        order.removeItem(productId);
    }

    checkout(orderId: string): void {
        const order = this.findOrder(orderId);
        if (!order) {
            throw new Error(`Không tìm thấy Order với id ${orderId}`);
        }
        if (order.status !== "NEW") {
            throw new Error(`Không hủy được`);
        }
        order.status = OrderStatus.PAID;
    }

    cancelOrder(orderId: string): void {
        const order = this.findOrder(orderId);
        if (!order) {
            throw new Error(`Không tìm thấy Order với id ${orderId}`);
        }
        if (order.status !== "PAID") {
            throw new Error(`Không hủy được`);
        }
        order.status = OrderStatus.CANCELLED;
    }

    findOrder(orderId: string): Order | undefined {
        return this._orders.find((order) => order.id === orderId);
    }

    getOrders(): Order[] {
        return [...this._orders];
    }

    printOrders() {
        console.log("Order List:");

        this._orders.forEach((order) => {
            console.log(`Order: ${order.id}, Status: ${order.status}`);
        });
    }
}
