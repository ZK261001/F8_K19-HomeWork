import type { Customer } from "../../models/Customer";
import type { CustomerServiceI } from "./type";

export class CustomerService implements CustomerServiceI {
    private customers: Customer[] = [];
    addCustomer(customer: Customer): void {
        const existingCustomer = this.findById(customer.id);
        if (existingCustomer) {
            throw new Error("Khách hàng đã tồn tại");
        }

        this.customers.push(customer);
    }

    updateCustomer(id: string, data: Partial<Customer>): void {
        const customer = this.findById(id);
        if (!customer) {
            throw new Error("Khách hàng không tòn tại");
        }

        if (data.phone) {
            customer.phone = data.phone;
        }

        if (data.name) {
            customer.name = data.name;
        }

        if (data.address) {
            customer.address = data.address;
        }
    }

    deleteCustomer(id: string): void {
        this.customers.filter((customer) => customer.id !== id);
    }

    findById(id: string): Customer | undefined {
        return this.customers.find((customer) => customer.id === id);
    }

    findByPhone(phone: string): Customer[] {
        return this.customers.filter((customer) => customer.phone === phone);
    }

    getAllCustomers(): Customer[] {
        return [...this.customers];
    }

    printCustomers(): void {
        console.log("Customer List:");
        this.customers.forEach((customer) => {
            console.log(customer.toString());
        });
    }
}
