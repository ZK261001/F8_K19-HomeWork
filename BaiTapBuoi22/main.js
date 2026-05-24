const invoiceData = {
    meta: {
        invoiceNo: "WM-20260521-0001",
        saleDate: "2026/05/21",
        currency: "VND",
        paymentMethod: "Cash",
    },

    seller: {
        name: "WinMart 2 Hai Bà Trưng",
        address: "2 Hai Bà Trưng - Hoàn Kiếm - Hà Nội",
        phone: "012345678",
        representative: "Đại diện WinMark",
    },

    customer: {
        name: "Nguyễn Văn A",
        age: 20,
        address: "Hà Đông, Hà Nội",
    },

    items: [
        {
            no: 1,
            name: "Áo thun",
            size: "XL",
            quantity: 1,
            price: 200000,
        },
        {
            no: 2,
            name: "Áo ba lỗ",
            size: "L",
            quantity: 3,
            price: 100000,
        },
        {
            no: 3,
            name: "Áo sơ mi",
            size: "XL",
            quantity: 1,
            price: 500000,
        },
        {
            no: 4,
            name: "Quần dài",
            size: "M",
            quantity: 1,
            price: 250000,
        },
        {
            no: 5,
            name: "Quần đùi",
            size: "2XL",
            quantity: 1,
            price: 150000,
        },
    ],

    promotion: {
        description: "Khuyến mãi 50% dành cho Khách hàng thân thiết",
        discountPercent: 50,
    },
};

function formatMoney(value) {
    return value.toLocaleString("vi-VN") + " đ";
}

// Render Header

const headerCodeEl = document.querySelector(".invoice-header__code");
headerCodeEl.innerHTML = `<span>Mã số: </span> ${invoiceData.meta.invoiceNo}`;

const headerDateEl = document.querySelector(".invoice-header__date");
headerDateEl.innerHTML = `<span>Ngày bán: </span> ${invoiceData.meta.saleDate}`;

// Render Parties

const sellerInfoEl = document.querySelector(".seller-info");
const buyerInfoEl = document.querySelector(".buyer-info");

sellerInfoEl.innerHTML += `
<p class="seller-info__name">
    ${invoiceData.seller.name}
</p>

<p class="seller-info__address">
    <i class="fa-solid fa-location-dot"></i>
    ${invoiceData.seller.address}
</p>

<p class="seller-info__phone">
    <i class="fa-solid fa-phone"></i>
    ${invoiceData.seller.phone}
</p>
`;

buyerInfoEl.innerHTML += `
<p class="buyer-info__name">
    ${invoiceData.customer.name}
</p>

<p class="buyer-info__age">
    <span>Tuổi:</span>
    ${invoiceData.customer.age}
</p>

<p class="buyer-info__address">
    <i class="fa-solid fa-location-dot"></i>
    ${invoiceData.customer.address}
</p>
`;

// Render Items
let subtotal = 0;
const itemsListBodyEl = document.querySelector(".items-list__body");
itemsListBodyEl.innerHTML = invoiceData.items
    .map((item) => {
        subtotal += item.quantity * item.price;
        return `
<tr>
    <td>${item.no}</td>
    <td>${item.name}</td>
    <td>${item.size}</td>
    <td>${item.quantity}</td>
    <td>${formatMoney(item.price)}</td>
    <td>${formatMoney(item.quantity * item.price)}</td>
</tr>
`;
    })
    .join("");

// Render Footer
const promoDescriptionEl = document.querySelector(
    ".invoice-promotion__description",
);
promoDescriptionEl.textContent = invoiceData.promotion.description;

const summarySubtotal = document.querySelector(".invoice-summary__sub-total");
summarySubtotal.textContent = formatMoney(subtotal);

const discountAmount = (subtotal * invoiceData.promotion.discountPercent) / 100;
const summaryDiscount = document.querySelector(".invoice-summary__discount");
summaryDiscount.textContent = `-${formatMoney(discountAmount)}`;

const summaryTotal = document.querySelector(".invoice-summary__total");
summaryTotal.textContent = `${formatMoney(subtotal - discountAmount)}`;
