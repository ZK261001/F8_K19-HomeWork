import {
    renderTable,
    headers,
    renderDialog,
    openDialog,
    reloadTable,
} from "./utils/index.js";

// Get all customers
const getCustomers = async () => {
    try {
        const response = await fetch("http://localhost:3000/customers");
        return await response.json();
    } catch {
        alert("get data failed");
    }
};

// Get customer by id
const getCustomerById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/customers/${id}`);
        return await res.json();
    } catch (e) {
        alert("get data failed");
    }
};

// Create a customer
const createCustomer = async (data) => {
    try {
        const res = await fetch(`http://localhost:3000/customers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            throw new Error(`Get data failed: ${response.status}`);
        }

        return await res.json();
    } catch (e) {
        alert("Create failed");
    }
};

// edit customer by Id
const editCustomerById = async (id, data) => {
    try {
        const res = await fetch(`http://localhost:3000/customers/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            throw new Error(`Get data failed: ${response.status}`);
        }

        return await res.json();
    } catch (e) {
        alert("Patch failed");
    }
};

// Delete customer by Id
const deleteCustomerById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/customers/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            throw new Error(`Get data failed: ${response.status}`);
        }

        return await res.json();
    } catch (e) {
        alert("Delete failed");
    }
};

const init = async () => {
    await reloadTable();

    // const customers = await getCustomers();

    // const panel = document.querySelector(".panel");
    // panel.append(renderTable(headers, customers));

    document.body.append(renderDialog());

    const addNew = document.querySelector(".btn-add");

    addNew.addEventListener("click", () => {
        openDialog();
    });
};

init();

export {
    getCustomerById,
    getCustomers,
    createCustomer,
    editCustomerById,
    deleteCustomerById,
};
