const employees = [
    { id: 1, name: "Alice", age: 23, status: "working" },
    { id: 3, name: "Bob", age: 25, status: "working" },
    { id: 6, name: "John", age: 27, status: "working" },
    { id: 8, name: "David", age: 23, status: "quit_job" },
    { id: 10, name: "Eve", age: 20, status: "working" },
];

const products = [
    { id: 1, name: "Phone", price: 1200 },
    { id: 2, name: "Laptop", price: 3000 },
    { id: 3, name: "Tab", price: 2000 },
    { id: 4, name: "PC", price: 800 },
    { id: 5, name: "Monitor", price: 1500 },
];

const orders = [
    { id: 1, employeeId: 1, productId: 4, quantity: 1 },
    { id: 2, employeeId: 3, productId: 2, quantity: 4 },
    { id: 3, employeeId: 1, productId: 5, quantity: 3 },
    { id: 4, employeeId: 6, productId: 1, quantity: 2 },
    { id: 5, employeeId: 3, productId: 5, quantity: 3 },
    { id: 6, employeeId: 8, productId: 1, quantity: 1 },
    { id: 7, employeeId: 10, productId: 3, quantity: 2 },
];

/*
Yeu cau viet ham
+	lam dung 80%
+	comment code: bang tieng anh (neu co comment)
+	ten bien: tuan thu quy tac
+	toi uu 20%
+	toc do
+	code (ham dung chung thi viet chung)chung
*/

// Shared Function
function findMax(arr, selector) {
    let maxItem = arr[0];
    for (const item of arr) {
        if (selector(item) > selector(maxItem)) {
            maxItem = item;
        }
    }
    return maxItem;
}

function findById(arr, id) {
    if (!arr || arr.length === 0) return null;
    for (const item of arr) {
        if (item.id === id) return item;
    }
    return null;
}

function calcRevenue(orderList, products) {
    if (!orderList || orderList.length === 0) return 0;

    let total = 0;
    for (const order of orderList) {
        const product = findById(products, order.productId);
        if (!product) continue;
        total += product.price * order.quantity;
    }
    return total;
}

function calcTotalQuantity(orderList) {
    let total = 0;
    for (const order of orderList) {
        total += order.quantity;
    }
    return total;
}

function quickSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const pivot = arr[mid];

    const leftArr = [];
    const rightArr = [];

    for (let i = 0; i < arr.length; i++) {
        if (i !== mid) {
            if (arr[i].revenue > pivot.revenue) {
                leftArr.push(arr[i]);
            } else {
                rightArr.push(arr[i]);
            }
        }
    }

    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
}

// Map
const ordersByEmployeeMap = {};
for (const order of orders) {
    const id = order.employeeId;
    if (!ordersByEmployeeMap[id]) ordersByEmployeeMap[id] = [];
    ordersByEmployeeMap[id].push(order);
}

const ordersByProductMap = {};
for (const order of orders) {
    const id = order.productId;
    if (!ordersByProductMap[id]) ordersByProductMap[id] = [];
    ordersByProductMap[id].push(order);
}

// Exercise 1: Get list of working employees

function getWorkingEmployees(employees) {
    return employees.filter((emp) => emp.status === "working");
}

// console.log(getWorkingEmployees(employees));

//Exercise 2: Get the oldest employee
function getOldestEmployee(employees) {
    return findMax(employees, (emp) => emp.age);
}

// console.log(getOldestEmployee(employees));

//Exercise 3: Get the cheapest product
function getCheapestProduct(products) {
    return findMax(products, (p) => p.price * -1);
}

// console.log(getCheapestProduct(products));

//Exercise 4: Find the best-selling product by total quantity sold
function getBestSellingProduct(ordersByProductMap, products) {
    let bestProductId = null;
    let maxQty = -Infinity;

    for (const productId in ordersByProductMap) {
        const totalQty = calcTotalQuantity(ordersByProductMap[productId]);
        if (totalQty > maxQty) {
            maxQty = totalQty;
            bestProductId = Number(productId);
        }
    }

    const product = findById(products, bestProductId);
    return { id: product.id, name: product.name, totalQuantity: maxQty };
}

// console.log(ordersByProductMap);
// console.log(ordersByEmployeeMap);
// console.log(getBestSellingProduct(ordersByProductMap, products));

//Exercise 5: Find the product with the highest total revenue
function getHighestRevenueProduct(ordersByProductMap, products) {
    let bestProductId = null;
    let maxRevenue = -Infinity;

    for (const productId in ordersByProductMap) {
        const revenue = calcRevenue(ordersByProductMap[productId], products);
        if (revenue > maxRevenue) {
            maxRevenue = revenue;
            bestProductId = Number(productId);
        }
    }

    const product = findById(products, bestProductId);
    return { id: product.id, name: product.name, revenue: maxRevenue };
}
// console.log(getHighestRevenueProduct(ordersByProductMap, products));

//Exercise 6: Find the employee who sold the most items by total quantity
function getEmployeeWithMostSales(ordersByEmployeeMap, employees) {
    const workingEmployees = getWorkingEmployees(employees);
    let bestEmployeeId = null;
    let maxQty = -Infinity;

    for (const employee of workingEmployees) {
        const totalQty = calcTotalQuantity(
            ordersByEmployeeMap[employee.id] || [],
        );
        if (totalQty > maxQty) {
            maxQty = totalQty;
            bestEmployeeId = employee.id;
        }
    }

    const employee = findById(employees, bestEmployeeId);
    return { id: employee.id, name: employee.name, totalQuantity: maxQty };
}

// console.log(getEmployeeWithMostSales(ordersByEmployeeMap, employees));

//Exercise 7: Find the employee with the highest total revenue
function getEmployeeWithHighestRevenue(
    ordersByEmployeeMap,
    employees,
    products,
) {
    const workingEmployees = getWorkingEmployees(employees);
    let bestEmployeeId = null;
    let maxRevenue = -Infinity;

    for (const employee of workingEmployees) {
        const revenue = calcRevenue(ordersByEmployeeMap[employee.id], products);
        if (revenue > maxRevenue) {
            maxRevenue = revenue;
            bestEmployeeId = employee.id;
        }
    }

    const employee = findById(employees, bestEmployeeId);
    return { id: employee.id, name: employee.name, revenue: maxRevenue };
}
// console.log(
//     getEmployeeWithHighestRevenue(ordersByEmployeeMap, employees, products),
// );

//Exercise 8: Find the highest-revenue product for each employee
function getTopProductPerEmployee(ordersByEmployeeMap, employees, products) {
    const result = [];

    const workingEmployees = getWorkingEmployees(employees);

    for (const employee of workingEmployees) {
        const orderList = ordersByEmployeeMap[employee.id];
        if (!orderList) continue;

        const bestOrder = findMax(
            orderList,
            (order) =>
                findById(products, order.productId).price * order.quantity,
        );
        const topProduct = findById(products, bestOrder.productId);

        result.push({
            employeeId: employee.id,
            employeeName: employee.name,
            productName: topProduct.name,
            revenue: topProduct.price * bestOrder.quantity,
        });
    }

    return result;
}
// console.log(getTopProductPerEmployee(ordersByEmployeeMap, employees, products));

// Exercise 9: Calculate commission for each employee based on their total revenue
function getEmployeeCommissions(
    ordersByEmployeeMap,
    employees,
    products,
    commissionRate,
) {
    const result = [];

    const workingEmployees = getWorkingEmployees(employees);

    for (const employee of workingEmployees) {
        const orderList = ordersByEmployeeMap[employee.id];
        if (!orderList) continue;

        const revenue = calcRevenue(orderList, products);
        result.push({
            id: employee.id,
            name: employee.name,
            revenue: revenue,
            commission: revenue * commissionRate,
        });
    }

    return result;
}

// console.log(
//     getEmployeeCommissions(ordersByEmployeeMap, employees, products, 0.03),
// );

// Exercise 10: Sort working employees by total revenue in descending order
function getEmployeesSortedByRevenue(ordersByEmployeeMap, employees, products) {
    const workingEmployees = getWorkingEmployees(employees);

    const employeesWithRevenue = [];
    for (const emp of workingEmployees) {
        employeesWithRevenue.push({
            id: emp.id,
            name: emp.name,
            revenue: calcRevenue(ordersByEmployeeMap[emp.id], products),
        });
    }

    return quickSort(employeesWithRevenue);
}

// console.log(
//     getEmployeesSortedByRevenue(ordersByEmployeeMap, employees, products),
// );
