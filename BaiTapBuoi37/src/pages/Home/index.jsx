import { useEffect, useState } from "react";
import "./Home.css";
import api from "../../plugins/axios";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router";

function Home() {
    const [productInCart, setProductInCart] = useState([]);
    // const [total, setTotal] = useState(0);
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const { data } = await api.get("products");
        setProducts(data);
    };

    const addToCart = (productId) => {
        if (productInCart.includes(productId)) return;

        setProductInCart([...productInCart, productId]);
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <header className="header">
                <div className="header-inner">
                    <div className="logo">
                        Shop<span>.</span>
                    </div>

                    <nav className="nav">
                        <a href="#">Home</a>
                        <a href="#">Products</a>
                        <a href="#">Categories</a>
                    </nav>

                    <div className="cart">
                        <button className="cart-button">
                            <span className="cart-icon">🛒</span>
                            <span className="cart-text">Cart</span>
                            <span className="cart-badge">
                                {productInCart.length}
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="container">
                <h1>Products</h1>
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard
                            product={product}
                            onClickAddToCart={addToCart}
                        />
                    ))}
                </div>
            </main>
        </>
    );
}

export default Home;
