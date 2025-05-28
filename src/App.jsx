import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { CartProvider } from "./contexts/CartContext";
import CoffeePage from "./pages/CoffeePage";
import CoffeeDetailPage from "./pages/CoffeeDetailPage";
import IngredientsPage from "./pages/IngredientsPage";
import IngredientDetailPage from "./pages/IngredientsDetailPage";
import CartPage from "./pages/CartPage";
import CoffeeModal from "./components/AddToCartModal";

const App = () => {
  return (
    <CurrencyProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<CoffeePage />} />
            <Route path="/coffee" element={<CoffeePage />} />
            <Route path="/coffee/:id" element={<CoffeeDetailPage />} />
            <Route path="/ingredients" element={<IngredientsPage />} />
            <Route path="/ingredients/:id" element={<IngredientDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          <CoffeeModal />
        </Router>
      </CartProvider>
    </CurrencyProvider>
  );
};

export default App;
