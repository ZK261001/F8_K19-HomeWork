import { Customer } from "../../Models/Customer";

export class CustomerService {
    private customers: Customer[] = [];
    create(customer: Omit<Customer, "id">): Customer {
        const newCustomer = new Customer(
            customer.name,
            customer.tax,
            customer.address,
        );
        this.customers.push(newCustomer);
        return newCustomer;
    }

    updateById(id: string, data: Partial<Customer>): Customer | null {
        const customer = this.customers.find((customer) => customer.id === id);
        if (!customer) return null;

        if (data.name) {
            customer.name = data.name;
        }
        if (data.tax) {
            customer.tax = data.tax;
        }
        if (data.address) {
            customer.address = data.address;
        }

        return customer;
    }
}
