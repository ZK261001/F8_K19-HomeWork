import { CustomerService } from "./src/Services/CustomerService";
import { EmployeeService } from "./src/Services/EmployeeService";
import { ProjectService } from "./src/Services/ProjectService";

let passed = 0;
let failed = 0;
function check(name: string, condition: boolean): void {
    if (condition) {
        console.log(`✅ ${name}`);
        passed++;
    } else {
        console.log(`❌ ${name}`);
        failed++;
    }
}

function captureConsole(fn: () => void): string[] {
    const logs: string[] = [];
    const original = console.log;
    console.log = (...args: unknown[]) => {
        logs.push(args.join(" "));
    };
    try {
        fn();
    } finally {
        console.log = original;
    }
    return logs;
}

const customerService = new CustomerService();
const employeeService = new EmployeeService();
const projectService = new ProjectService(employeeService);

// Test Case 1: Tạo Customer
const customer1 = customerService.create({
    name: "Cong ty A",
    tax: "0101234567",
    address: "Ha Noi",
});
check("TC1: Customer duoc tao thanh cong va co id", !!customer1.id);

// Test Case 2: Cập nhật Customer
const updatedCustomer = customerService.updateById(customer1.id, {
    address: "Ho Chi Minh",
});
check(
    "TC2: Dia chi Customer duoc cap nhat",
    updatedCustomer?.address === "Ho Chi Minh",
);

// Test Case 3: Tạo Employee
const employee1 = employeeService.create({ name: "Nguyen Van A" });
const employee2 = employeeService.create({ name: "Tran Thi B" });
check("TC3: 2 Employee co id khac nhau", employee1.id !== employee2.id);

// Test Case 4: Tìm Employee
const foundEmployee = employeeService.findById(employee1.id);
check("TC4: Tim dung Employee theo id", foundEmployee === employee1);
const notFoundEmployee = employeeService.findById("khong-ton-tai");
check(
    "TC4: Tim Employee voi id khong ton tai tra ve null",
    notFoundEmployee === null,
);

// Test Case 5: Tạo Project
let project1: ReturnType<typeof projectService.create>;
const createLogs = captureConsole(() => {
    project1 = projectService.create({
        customerId: customer1.id,
        employeeId: employee1.id,
    });
});
check("TC5: Project duoc tao thanh cong", !!project1!.id);
check(
    "TC5: Employee duoc gan nhan duoc thong bao",
    createLogs.some(
        (log) => log.includes(employee1.id) && log.includes(employee1.name),
    ),
);

// Test Case 6: Đổi nhân viên phụ trách Project
const updateEmployeeLogs = captureConsole(() => {
    projectService.updateById(project1!.id, { employeeId: employee2.id });
});
check(
    "TC6: Project duoc cap nhat employeeId moi",
    projectService.updateById(project1!.id, {})?.employeeId === employee2.id,
);
check(
    "TC6: Employee moi nhan duoc thong bao (khong phai employee cu)",
    updateEmployeeLogs.some(
        (log) => log.includes(employee2.id) && log.includes(employee2.name),
    ) && !updateEmployeeLogs.some((log) => log.includes(employee1.id)),
);

// Test Case 7: Cập nhật Project nhưng không đổi Employee
const customer2 = customerService.create({
    name: "Cong ty C",
    tax: "0109876543",
    address: "Da Nang",
});
const noNotiLogs = captureConsole(() => {
    projectService.updateById(project1!.id, { customerId: customer2.id });
});
check(
    "TC7: Khong goi receiveNoti khi chi doi customerId",
    noNotiLogs.length === 0,
);

// Test Case 8: Cập nhật dữ liệu không tồn tại
const badCustomerUpdate = customerService.updateById("khong-ton-tai", {
    address: "X",
});
const badEmployeeUpdate = employeeService.updateById("khong-ton-tai", {
    name: "X",
});
const badProjectUpdate = projectService.updateById("khong-ton-tai", {
    customerId: customer1.id,
});
check(
    "TC8: updateById voi id khong ton tai tra ve null (Customer, Employee, Project)",
    badCustomerUpdate === null &&
        badEmployeeUpdate === null &&
        badProjectUpdate === null,
);

// Test Case 9: Tạo Project với employeeId không tồn tại
let project2: ReturnType<typeof projectService.create> | undefined;
let tc9Error: unknown = null;
const tc9Logs = captureConsole(() => {
    try {
        project2 = projectService.create({
            customerId: customer1.id,
            employeeId: "khong-ton-tai",
        });
    } catch (err) {
        tc9Error = err;
    }
});
check(
    "TC9: Project van duoc tao voi employeeId khong ton tai",
    !!project2?.id && tc9Error === null,
);
check("TC9: Khong co thong bao nao duoc gui", tc9Logs.length === 0);

console.log(
    `\nKet qua: ${passed} passed, ${failed} failed / ${passed + failed} tests`,
);
