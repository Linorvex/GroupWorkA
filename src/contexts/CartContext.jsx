import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(null);

  const addToCart = (coffee, selectedIngredients = []) => {
    const ingredientsCost = selectedIngredients.reduce(
      (total, ing) => total + ing.price,
      0
    );
    const totalPrice = coffee.price + ingredientsCost;

    const cartItem = {
      id: Date.now(), // Simple ID generation
      coffee,
      ingredients: selectedIngredients,
      totalPrice,
      timestamp: new Date(),
    };

    setCartItems((prev) => [...prev, cartItem]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const openModal = (coffee) => {
    setSelectedCoffee(coffee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCoffee(null);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.length;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isModalOpen,
        selectedCoffee,
        addToCart,
        removeFromCart,
        clearCart,
        openModal,
        closeModal,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
