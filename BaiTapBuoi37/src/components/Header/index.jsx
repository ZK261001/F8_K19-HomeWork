import { NavLink } from "react-router";

const Header = ({ total }) => {
    return (
        <header className="header">
            <div className="header-inner">
                <div className="logo">
                    Shop<span>.</span>
                </div>

                <nav className="nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/">Products</NavLink>
                    <NavLink to="/">Categories</NavLink>
                </nav>

                <div className="cart">
                    <button className="cart-button">
                        <span className="cart-icon">🛒</span>
                        <span className="cart-text">Cart</span>
                        <span className="cart-badge">{total}</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
