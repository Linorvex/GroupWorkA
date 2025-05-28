import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, Coffee } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useCart } from "../contexts/CartContext";
import { useCurrency } from "../contexts/CurrencyContext";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useCart();
  const { convertPrice, getCurrencySymbol } = useCurrency();

  const handlePurchase = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Purchase successful! Thank you for your order.");
    clearCart();
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) {
      alert("Your cart is already empty!");
      return;
    }
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentPath="/cart" />
      <div className="main-content">
        <Header title="Shopping Cart" />
        <div className="page-content">
          {cartItems.length === 0 ? (
            <div className="detail-container">
              <h2>Your cart is empty</h2>
              <p>Add some delicious coffee to get started!</p>
              <Link to="/coffee" className="back-button">
                <ArrowLeft size={16} />
                Back to Coffee Menu
              </Link>
            </div>
          ) : (
            <div className="cart-container">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div
                      // className="cart-item-image"
                      className="w-48 h-32 object-cover rounded-lg flex-shrink-0"
                    >
                      <img
                        src={item.coffee.image}
                        alt={item.coffee.name}
                        className=""
                      />
                    </div>
                    <div className="cart-item-details">
                      <h3 className="cart-item-title">{item.coffee.name}</h3>
                      <p className="cart-item-description">
                        {item.coffee.shortDescription}
                      </p>
                      <div className="cart-item-base-price">
                        Base Price: {getCurrencySymbol()}
                        {convertPrice(item.coffee.price)}
                      </div>
                      {item.ingredients.length > 0 && (
                        <div className="cart-item-ingredients">
                          <strong>Added Ingredients:</strong>
                          <ul className="ingredients-list">
                            {item.ingredients.map((ingredient) => (
                              <li
                                key={ingredient.id}
                                className="ingredient-list-item"
                              >
                                {ingredient.name} - {getCurrencySymbol()}
                                {convertPrice(ingredient.price)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="cart-item-actions">
                      <div className="cart-item-total">
                        <strong>
                          {getCurrencySymbol()}
                          {convertPrice(item.totalPrice)}
                        </strong>
                      </div>
                      <button
                        className="btn-small btn-delete"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove from cart"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="cart-total">
                  <h3>
                    Total: {getCurrencySymbol()}
                    {convertPrice(getCartTotal())}
                  </h3>
                </div>
                <div className="cart-actions">
                  <button
                    className="btn btn-primary cart-purchase-btn"
                    onClick={handlePurchase}
                  >
                    Purchase
                  </button>
                  <button
                    className="btn btn-secondary cart-clear-btn"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </button>
                </div>
                <Link to="/coffee" className="back-button">
                  <ArrowLeft size={16} />
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
