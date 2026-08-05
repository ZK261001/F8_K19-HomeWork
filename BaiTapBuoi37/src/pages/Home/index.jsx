import { useEffect, useState } from "react";
import "./Home.css";
import api from "../../plugins/axios";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";

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
            <Header total={productInCart.length} />

            <main className="container">
                <h1>Products</h1>
                <div className="product-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
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
