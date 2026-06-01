const getProducts = async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        return data;
    } catch (e) {
        alert("Lỗi khi tải sản phẩm: " + e);
    }
};

let allProducts = [];
let cartCount = 0;
let currentCategory = "all";

const renderCategories = (products) => {
    const sidebarContent = document.querySelector(".sidebar-content");

    const categoryCounts = {};
    products.forEach((p) => {
        categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });

    sidebarContent.innerHTML = "";

    const allItem = document.createElement("div");
    allItem.classList = "categorie-item active";
    allItem.dataset.category = "all";
    allItem.innerText = "Tất cả sản phẩm";
    sidebarContent.append(allItem);

    Object.entries(categoryCounts).forEach(([name, count]) => {
        const item = document.createElement("div");
        item.classList = "categorie-item";
        item.dataset.category = name;

        const label = document.createElement("span");
        label.innerText = name;

        const badge = document.createElement("span");
        badge.classList = "quantityCategory";
        badge.innerText = count;

        item.append(label, badge);
        sidebarContent.append(item);
    });

    sidebarContent.querySelectorAll(".categorie-item").forEach((item) => {
        item.addEventListener("click", () => {
            sidebarContent
                .querySelectorAll(".categorie-item")
                .forEach((el) => el.classList.remove("active"));
            item.classList.add("active");
            currentCategory = item.dataset.category;
            filterAndRender();
        });
    });
};

const renderProductCard = (product) => {
    const cardContainer = document.createElement("div");
    cardContainer.classList = "product-item";
    cardContainer.setAttribute("data-id", product.id);

    const prodCategory = document.createElement("p");
    prodCategory.classList = "product-item-category";
    prodCategory.innerText = product.category;

    const prodItemImg = document.createElement("div");
    prodItemImg.classList = "product-item-img";
    const prodImg = document.createElement("img");
    prodImg.setAttribute("src", product.image);
    prodImg.setAttribute("alt", product.title);
    prodItemImg.append(prodImg);

    const prodItemTitle = document.createElement("p");
    prodItemTitle.classList = "product-item-title";
    prodItemTitle.innerText = product.title;

    const prodItemStar = document.createElement("p");
    prodItemStar.classList = "product-item-star";
    const prodItemStarIcon = document.createElement("i");
    prodItemStarIcon.classList = "fa-solid fa-star";
    const prodItemStarRate = document.createElement("span");
    prodItemStarRate.innerText = " " + product.rating.rate;
    const prodItemStarCount = document.createElement("span");
    prodItemStarCount.classList = "quantity-star";
    prodItemStarCount.innerText = ` (${product.rating.count})`;
    prodItemStar.append(prodItemStarIcon, prodItemStarRate, prodItemStarCount);

    const prodItemFooter = document.createElement("div");
    prodItemFooter.classList = "product-item-footer";
    const prodItemPrice = document.createElement("p");
    prodItemPrice.classList = "product-item-price";
    prodItemPrice.innerText = `$${product.price}`;
    const prodItemBtn = document.createElement("button");
    prodItemBtn.setAttribute("title", "Thêm vào giỏ hàng");
    prodItemBtn.setAttribute("class", "btn-cart");
    const prodItemBtnIcon = document.createElement("i");
    prodItemBtnIcon.classList = "bi bi-cart2";
    prodItemBtn.append(prodItemBtnIcon);

    prodItemBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        cartCount++;
        document.querySelector(".cart-quantity").innerText = cartCount;
    });

    prodItemFooter.append(prodItemPrice, prodItemBtn);
    cardContainer.append(
        prodCategory,
        prodItemImg,
        prodItemTitle,
        prodItemStar,
        prodItemFooter,
    );

    return cardContainer;
};

const filterAndRender = () => {
    const filtered =
        currentCategory === "all"
            ? allProducts
            : allProducts.filter((p) => p.category === currentCategory);

    const productList = document.querySelector(".product-list");
    productList.innerHTML = "";
    filtered.forEach((product) => {
        productList.append(renderProductCard(product));
    });

    document.querySelector(".content-title").innerText =
        currentCategory === "all" ? "Tất cả sản phẩm" : currentCategory;
    document.querySelector(".quantity-products").innerText = filtered.length;
};

const init = async () => {
    allProducts = await getProducts();
    renderCategories(allProducts);
    filterAndRender();
};

init();
