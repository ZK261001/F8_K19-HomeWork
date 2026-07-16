import { CustomerService } from "./src/Services/CustomerService";
import { EmployeeService } from "./src/Services/EmployeeService";
import { ProjectService } from "./src/Services/ProjectService";

const customerService = new CustomerService();
const employeeService = new EmployeeService();
const projectService = new ProjectService(employeeService);

// Tạo Customer
const customer = customerService.create({
    name: "Cong ty A",
    tax: "0101234567",
    address: "Ha Noi",
});
console.log("Customer moi:", customer);

// Cập nhật địa chỉ Customer
customerService.updateById(customer.id, { address: "Ho Chi Minh" });
console.log("Customer sau khi cap nhat dia chi:", customer);

// Tạo Employee
const employee1 = employeeService.create({ name: "Nguyen Van A" });
const employee2 = employeeService.create({ name: "Tran Thi B" });
console.log("Employee 1:", employee1);
console.log("Employee 2:", employee2);

// Tìm Employee theo id
const found = employeeService.findById(employee1.id);
console.log("Tim thay Employee:", found);

// Tạo Project, Employee phụ trách sẽ nhận thông báo
const project = projectService.create({
    customerId: customer.id,
    employeeId: employee1.id,
});
console.log("Project moi:", project);

// Đổi nhân viên phụ trách Project, Employee mới sẽ nhận thông báo
projectService.updateById(project.id, { employeeId: employee2.id });
console.log("Project sau khi doi nhan vien phu trach:", project);

// Cập nhật Project nhưng không đổi Employee -> không có thông báo nào được gửi
projectService.updateById(project.id, { customerId: customer.id });
console.log("Project sau khi cap nhat customerId:", project);
