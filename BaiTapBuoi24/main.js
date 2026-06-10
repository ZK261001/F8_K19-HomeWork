// Fetch product data from API
const getProducts = async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const productsData = await response.json();
        return productsData;
    } catch (error) {
        console.log(error);
    }
};

// Fetch cart data from API
const getCart = async () => {
    try {
        const response = await fetch("http://localhost:3000/cart");
        const cartData = await response.json();
        return cartData;
    } catch (error) {
        console.log(error);
    }
};

// Generate category count data
const getCategoryStats = (products) => {
    const categoryMap = {};

    products.forEach((product) => {
        categoryMap[product.category] =
            (categoryMap[product.category] || 0) + 1;
    });

    const categoryStats = [
        {
            category: "Tất cả sản phẩm",
            count: products.length,
        },
    ];

    for (const category in categoryMap) {
        categoryStats.push({
            category,
            count: categoryMap[category],
        });
    }

    return categoryStats;
};

// Generate category products map
const getCategoryProductMap = (products) => {
    const categoryProductMap = {};
    products.forEach((product) => {
        const category = product.category;
        if (!categoryProductMap[category]) {
            categoryProductMap[category] = [];
        }
        categoryProductMap[category].push(product);
    });
    return categoryProductMap;
};

// // Filter products by category
const filterProductsByCategory = (category, products, categoryProductMap) => {
    if (category === "Tất cả sản phẩm") {
        return products;
    }
    return categoryProductMap[category];
};

// Render category list to sidebar
const renderCategoryList = (products) => {
    const categoryStats = getCategoryStats(products);
    const categoryProductMap = getCategoryProductMap(products);
    const categoryList = document.querySelector(".category-list");
    categoryList.innerHTML = "";
    categoryStats.forEach((categoryItem, index) => {
        const categoryElement = document.createElement("li");
        categoryElement.className = "category-item";

        // Add active class for first item
        if (index === 0) {
            categoryElement.className += " active";
        }

        const categoryName = document.createElement("span");
        categoryName.className = "category-item__name";
        categoryName.textContent = categoryItem.category;

        const categoryCount = document.createElement("span");
        categoryCount.className = "category-item__count";
        categoryCount.textContent = categoryItem.count;

        categoryElement.append(categoryName, categoryCount);

        // Handle category filter click
        categoryElement.addEventListener("click", () => {
            // Remove active class from all items
            const categoryItems = document.querySelectorAll(".category-item");
            categoryItems.forEach((item) => {
                item.className = "category-item";
            });

            // Add active class to clicked item
            categoryElement.className += " active";

            const filteredProducts = filterProductsByCategory(
                categoryItem.category,
                products,
                categoryProductMap,
            );
            renderProductCards(filteredProducts);
        });

        categoryList.append(categoryElement);
    });
};

// Generate DOM element for a product card
const createProductCardElement = (product) => {
    // Product card
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    // Image wrapper
    const imageWrapper = document.createElement("div");
    imageWrapper.className = "product-card__image-wrapper";

    // Product image
    const image = document.createElement("img");
    image.className = "product-card__image";
    image.setAttribute("src", product.image);
    image.setAttribute("alt", product.title);
    imageWrapper.append(image);

    // Category
    const category = document.createElement("div");
    category.className = "product-card__category";
    category.textContent = product.category;

    // Title
    const title = document.createElement("div");
    title.className = "product-card__title";
    title.textContent = product.title;

    // Rating
    const rating = document.createElement("div");
    rating.className = "product-card__rating";

    // Star wrapper
    const star = document.createElement("div");
    star.className = "product-card__star";

    // Star icon
    const starIcon = document.createElement("i");
    starIcon.className = "product-card__star--icon fa-solid fa-star";
    star.append(starIcon);

    // Rate
    const rate = document.createElement("div");
    rate.className = "product-card__rate";
    rate.textContent = product.rating.rate;

    // Count
    const count = document.createElement("div");
    count.className = "product-card__count";
    count.textContent = `(${product.rating.count})`;
    rating.append(star, rate, count);

    // Footer
    const footer = document.createElement("div");
    footer.className = "product-card__footer";

    // Price
    const price = document.createElement("div");
    price.className = "product-card__price";
    price.textContent = `$${product.price}`;

    // Cart button
    const cartBtn = document.createElement("button");
    cartBtn.className = "product-card__cart-btn";
    cartBtn.addEventListener("click", () => {
        addToCart(product);
    });

    // Cart icon
    const cartIcon = document.createElement("i");
    cartIcon.className =
        "product-card__cart-btn--icon fa-solid fa-cart-shopping";
    cartBtn.append(cartIcon);
    footer.append(price, cartBtn);

    // Append
    productCard.append(imageWrapper, category, title, rating, footer);

    return productCard;
};

// Render product cards to product grid
const renderProductCards = (products) => {
    const productGrid = document.querySelector(".product-grid");
    productGrid.innerHTML = "";
    products.forEach((product) => {
        const productCard = createProductCardElement(product);
        productGrid.append(productCard);
    });
};

// Calculate total cart quantity
const getCartCount = (cart) => {
    let cartCount = 0;
    cart.forEach((cartItem) => {
        cartCount += cartItem.quantity;
    });
    return cartCount;
};

// Render cart count to header
const renderCartCount = async () => {
    const cart = await getCart();
    const cartCount = getCartCount(cart);
    const cartCountElement = document.querySelector(".header__cart-count");
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? "flex" : "none";
};

// Add item to cart
const addToCart = async (product) => {
    try {
        const cart = await getCart();
        let existingCartItem = null;
        for (const cartItem of cart) {
            if (product.id === cartItem.id) {
                existingCartItem = cartItem;
                break;
            }
        }

        if (existingCartItem) {
            // Update cart
            await fetch(`http://localhost:3000/cart/${product.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    quantity: existingCartItem.quantity + 1,
                }),
            });
        } else {
            // Post new cart
            await fetch("http://localhost:3000/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: product.id,
                    ...product,
                    quantity: 1,
                }),
            });
        }

        await renderCartCount();
    } catch (error) {
        console.log(error);
    }
};

const init = async () => {
    const products = await getProducts();
    await renderCartCount();
    renderCategoryList(products);
    renderProductCards(products);
};

init();
