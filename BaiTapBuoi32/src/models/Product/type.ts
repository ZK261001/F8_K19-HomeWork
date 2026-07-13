export interface ProductI {
    increaseStock(quantity: number): void;
    decreaseStock(quantity: number): void;
    toString(): string;
}
