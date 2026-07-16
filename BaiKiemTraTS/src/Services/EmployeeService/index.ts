import { Employee } from "../../Models/Employee";

export class EmployeeService {
    private employees: Employee[] = [];
    create(employee: Omit<Employee, "id" | "receiveNoti">): Employee {
        if (!employee.name) throw new Error("Wrong format");
        const newEmployee = new Employee(employee.name);
        this.employees.push(newEmployee);
        return newEmployee;
    }

    findById(id: string): Employee | null {
        const employee = this.employees.find((employee) => employee.id === id);
        if (!employee) return null;
        return employee;
    }

    updateById(id: string, data: Partial<Employee>): Employee | null {
        const employee = this.findById(id);
        if (!employee) return null;
        if (data.name) {
            employee.name = data.name;
        }
        return employee;
    }
}
