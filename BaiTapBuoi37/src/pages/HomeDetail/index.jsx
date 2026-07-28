import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ProductCard from "../../components/ProductCard";
import "./HomeDetail.css";

function pickFeaturedProducts(products, currentId) {
    const others = products.filter(
        (product) => product.id !== Number(currentId),
    );
    const shuffled = [...others].sort(() => Math.random() - 0.5);
    const count = Math.min(shuffled.length, Math.floor(Math.random() * 5) + 4); // 4 -> 8

    return shuffled.slice(0, count);
}

function HomeDetail() {
    let params = useParams();
    const [product, setProduct] = useState(null);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [productInCart, setProductInCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${params.id}`)
            .then((res) => {
                if (!res.ok) {
                    navigate("/", {
                        replace: true,
                    });
                    return;
                }

                return res.json();
            })
            .then((product) => {
                setProduct(product);
            });

        fetch(`https://fakestoreapi.com/products`)
            .then((res) => res.json())
            .then((products) => {
                setFeaturedProducts(pickFeaturedProducts(products, params.id));
            });
    }, [params.id, navigate]);

    const addToCart = (productId) => {
        if (productInCart.includes(productId)) return;

        setProductInCart([...productInCart, productId]);
    };

    if (!product) return <div className="detail-loading">Loading...</div>;

    return (
        <main className="container">
            <div className="breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <span className="breadcrumb-category">{product.category}</span>
                <span>/</span>
                <span className="breadcrumb-current">{product.title}</span>
            </div>

            <div className="detail-wrapper">
                <div className="detail-image">
                    <img src={product.image} alt={product.title} />
                </div>

                <div className="detail-info">
                    <div className="detail-category">{product.category}</div>
                    <h1 className="detail-title">{product.title}</h1>

                    <div className="detail-rating">
                        ⭐ {product.rating.rate}
                        <span className="detail-rating-count">
                            ({product.rating.count} đánh giá)
                        </span>
                    </div>

                    <div className="detail-price">${product.price}</div>

                    <p className="detail-description">{product.description}</p>

                    <div className="detail-quantity">
                        <span>Số lượng</span>
                        <div className="quantity-control">
                            <button
                                onClick={() =>
                                    setQuantity((q) => Math.max(1, q - 1))
                                }
                            >
                                −
                            </button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity((q) => q + 1)}>
                                +
                            </button>
                        </div>
                    </div>

                    <div className="detail-actions">
                        <button
                            className="btn-add-to-cart"
                            onClick={() => addToCart(product.id)}
                        >
                            🛒 Thêm vào giỏ hàng
                        </button>
                        <button
                            className="btn-back"
                            onClick={() => navigate(-1)}
                        >
                            Quay lại
                        </button>
                    </div>
                </div>
            </div>

            {featuredProducts.length > 0 && (
                <section className="featured-section">
                    <h2>Sản phẩm nổi bật</h2>
                    <div className="product-grid">
                        {featuredProducts.map((item) => (
                            <ProductCard
                                key={item.id}
                                product={item}
                                onClickAddToCart={addToCart}
                            />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}

export default HomeDetail;
