import type { Customer } from "../../models/Customer";

export interface CustomerServiceI {
    addCustomer(customer: Customer): void;

    updateCustomer(id: string, data: Partial<Customer>): void;

    deleteCustomer(id: string): void;

    findById(id: string): Customer | undefined;

    findByPhone(phone: string): Customer[];

    getAllCustomers(): Customer[];

    printCustomers(): void;
}
