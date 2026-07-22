import { Product } from "./models/Product";
import { Customer } from "./models/Customer";
import { ProductService } from "./Services/ProductService";
import { CustomerService } from "./Services/CustomerService";
import { OrderService } from "./Services/OrderService/OrderService";

// ===== Product =====
const productService = new ProductService();

const iphone = new Product("Iphone 17", 17000000, 10);
const macbook = new Product("Macbook Air M4", 28000000, 5);

productService.addProduct(iphone);
productService.addProduct(macbook);

iphone.decreaseStock(2);
productService.updateProduct(macbook.id, { price: 27000000, stock: 8 });
productService.printProduct();

// ===== Customer =====
const customerService = new CustomerService();

const customer = new Customer("Nguyen Van A", "0912345678", "Hà Nội");
customerService.addCustomer(customer);
customerService.updateCustomer(customer.id, { address: "TP.HCM" });
customerService.printCustomers();

// ===== Order =====
const orderService = new OrderService(productService);

orderService.createOrder(customer);
const order = orderService.getOrders()[0];

orderService.addProduct(order.id, iphone.id, 1);
orderService.addProduct(order.id, macbook.id, 2);
orderService.addProduct(order.id, iphone.id, 1); // gộp dồn với dòng iphone phía trên thành số lượng 2

order.printInvoice();
productService.printProduct(); // tồn kho iphone/macbook đã giảm tương ứng

orderService.checkout(order.id);
console.log(`Trạng thái order sau khi checkout: ${order.status}`);

try {
    orderService.cancelOrder(order.id); // đơn đã PAID -> bị chặn hủy
} catch (error) {
    console.log(`Hủy đơn thất bại: ${(error as Error).message}`);
}

orderService.createOrder(customer);
const secondOrder = orderService.getOrders()[1];
orderService.addProduct(secondOrder.id, macbook.id, 1);
orderService.cancelOrder(secondOrder.id); // đơn NEW -> hủy được, tồn kho macbook được hoàn lại
console.log(`Trạng thái order 2 sau khi cancel: ${secondOrder.status}`);

productService.printProduct();
orderService.printOrders();
