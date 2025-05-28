import React from "react";
import { Link } from "react-router-dom";
import { Coffee, ShoppingCart, Edit } from "lucide-react";
import { useCart } from "../contexts/CartContext";

const Sidebar = ({ currentPath }) => {
  const { getCartItemsCount } = useCart();
  const cartCount = getCartItemsCount();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Coffee size={32} color="#92400e" />
        <span className="sidebar-title">Bean Brew</span>
      </div>

      <nav className="sidebar-nav">
        <Link
          to="/coffee"
          className={`nav-link ${currentPath === "/coffee" ? "active" : ""}`}
        >
          <Coffee size={20} />
          Coffee Menu
        </Link>
        <Link
          to="/ingredients"
          className={`nav-link ${
            currentPath === "/ingredients" ? "active" : ""
          }`}
        >
          <Edit size={20} />
          Manage Ingredients
        </Link>
        <Link
          to="/cart"
          className={`nav-link ${currentPath === "/cart" ? "active" : ""}`}
        >
          <div className="cart-icon-container">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
          Cart
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
