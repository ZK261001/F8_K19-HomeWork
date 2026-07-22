import type { Product } from "../../models/Product";

export interface ProductServiceI {
    addProduct(product: Product): void;
    updateProduct(id: string, data: Partial<Product>): void;
    deleteProduct(id: string): void;
    findById(id: string): Product | undefined;
    findByName(keyword: string): Product[];
    getAllProduct(): Product[];
    printProduct(): void;
}
