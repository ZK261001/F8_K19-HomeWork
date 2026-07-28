import { Link } from "react-router";
function ProductCard({ product, onClickAddToCart }) {
    return (
        <>
            <div className="product-card" key={product.id}>
                <div className="product-image">
                    <Link to={`${product.id}`} className="product-link">
                        <img src={product.image} alt={product.title} />
                    </Link>
                </div>

                <div className="product-info">
                    <div className="product-category">{product.category}</div>

                    <Link to={`${product.id}`} className="product-link">
                        <h3>{product.title}</h3>
                    </Link>

                    <p className="description">{product.description}</p>

                    <div className="product-rating">
                        ⭐ {product.rating.rate} ({product.rating.count})
                    </div>

                    <div className="product-bottom">
                        <strong>${product.price}</strong>

                        <button onClick={() => onClickAddToCart(product.id)}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCard;
