import type { Product } from "../../models/Product";
import type { ProductServiceI } from "./type";

export class ProductService implements ProductServiceI {
    private products: Product[] = [];
    addProduct(product: Product): void {
        const existingProduct = this.findById(product.id);
        if (existingProduct) {
            throw new Error("Sản phẩm đã tồn tại");
        }

        this.products.push(product);
    }

    updateProduct(id: string, data: Partial<Product>): void {
        const product = this.findById(id);

        if (!product) {
            throw new Error("Sản phẩm không tồn tại");
        }

        if (data.name) {
            product.name = data.name;
        }

        if (data.price !== undefined) {
            product.price = data.price;
        }

        if (data.stock !== undefined) {
            product.stock = data.stock;
        }
    }

    deleteProduct(id: string): void {
        this.products = this.products.filter((product) => product.id !== id);
    }

    findById(id: string): Product | undefined {
        return this.products.find((product) => product.id === id);
    }

    findByName(keyword: string): Product[] {
        return this.products.filter((product) =>
            product.name.toLowerCase().includes(keyword.toLowerCase()),
        );
    }

    getAllProduct(): Product[] {
        return [...this.products];
    }
    printProduct(): void {
        console.log("Product list:");
        this.products.forEach((product) => {
            console.log(product.toString());
        });
    }
}
