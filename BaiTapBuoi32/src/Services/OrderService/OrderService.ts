import { Customer } from "../../models/Customer";
import { Order } from "../../models/Order/Order";
import { OrderStatus } from "../../models/Order/type";
import { OrderItem } from "../../models/OrderItem/OrderItem";
import { ProductServiceI } from "../ProductService/type";
import type { OrderServiceI } from "./type";

export class OrderService implements OrderServiceI {
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

        product.decreaseStock(quantity);

        const orderItem = new OrderItem(product, quantity);
        order.addItem(orderItem);
    }

    removeProduct(orderId: string, productId: string): void {
        const order = this.findOrder(orderId);
        if (!order) {
            throw new Error(`Không tìm thấy Order với id ${orderId}`);
        }

        const item = order.items.find((item) => item.product.id === productId);
        if (item) {
            item.product.increaseStock(item.quantity);
        }

        order.removeItem(productId);
    }

    checkout(orderId: string): void {
        const order = this.findOrder(orderId);
        if (!order) {
            throw new Error(`Không tìm thấy Order với id ${orderId}`);
        }
        if (order.status !== OrderStatus.NEW) {
            throw new Error(`Không thể thanh toán đơn hàng này`);
        }
        order.status = OrderStatus.PAID;
    }

    cancelOrder(orderId: string): void {
        const order = this.findOrder(orderId);
        if (!order) {
            throw new Error(`Không tìm thấy Order với id ${orderId}`);
        }
        if (order.status === OrderStatus.PAID) {
            throw new Error(`Không thể hủy đơn hàng đã thanh toán`);
        }
        if (order.status === OrderStatus.CANCELLED) {
            throw new Error(`Đơn hàng đã được hủy trước đó`);
        }

        order.items.forEach((item) => {
            item.product.increaseStock(item.quantity);
        });

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
