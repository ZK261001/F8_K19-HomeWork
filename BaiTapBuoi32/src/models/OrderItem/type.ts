import type { Product } from "../Product";

export interface OrderItemI {
    product: Product;
    quantity: number;

    getTotal(): number;
}
