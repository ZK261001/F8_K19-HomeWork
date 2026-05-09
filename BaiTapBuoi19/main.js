const products = [
    { id: 1, name: "iPhone", price: 2000 },
    { id: 2, name: "Samsung", price: 1500 },
    { id: 3, name: "Xiaomi", price: 1000 },
    { id: 4, name: "Oppo", price: 1200 },
];
const orders = [
    {
        id: 1,
        items: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 },
        ],
    },
    {
        id: 2,
        items: [
            { productId: 1, quantity: 1 },
            { productId: 3, quantity: 3 },
        ],
    },
    {
        id: 3,
        items: [
            { productId: 2, quantity: 2 },
            { productId: 4, quantity: 1 },
        ],
    },
];

function findTopRevenueProduct(products, orders) {
    const productsMap = {};
    for (let i = 0; i < products.length; i++) {
        productsMap[products[i].id] = products[i];
    }

    const revenueMap = {};
    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        for (let j = 0; j < order.items.length; j++) {
            const item = order.items[j];
            const product = productsMap[item.productId];

            const revenue = product.price * item.quantity;

            if (revenueMap[item.productId] === undefined) {
                revenueMap[item.productId] = 0;
            }

            revenueMap[item.productId] += revenue;
        }
    }
    let maxRevenue = 0;
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        let revenue = 0;
        if (revenueMap[product.id] !== undefined) {
            revenue = revenueMap[product.id];
        }

        if (revenue > maxRevenue) {
            maxRevenue = revenue;

            bestProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                revenue: revenue,
            };
        }
    }
    return `Sản phẩm có doanh thu cao nhất là ${bestProduct.name}, doanh thu là ${bestProduct.revenue}`;
}

console.log(findTopRevenueProduct(products, orders));
