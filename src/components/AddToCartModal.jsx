import React, { useState } from "react";
import { X, Coffee } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useCurrency } from "../contexts/CurrencyContext";
import useFetch from "../hooks/useFetch";

const CoffeeModal = () => {
  const { isModalOpen, selectedCoffee, closeModal, addToCart } = useCart();
  const { convertPrice, getCurrencySymbol } = useCurrency();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const { response } = useFetch({
    url: "http://localhost:5000/api/v1/resource/ingredients",
    method: "GET",
  });
  if (!response) return <>loading</>;

  if (!isModalOpen || !selectedCoffee) return null;

  const handleIngredientChange = (ingredient, isChecked) => {
    if (isChecked) {
      setSelectedIngredients((prev) => [...prev, ingredient]);
    } else {
      setSelectedIngredients((prev) =>
        prev.filter((ing) => ing.id !== ingredient.id)
      );
    }
  };

  const calculateTotal = () => {
    const ingredientsCost = selectedIngredients.reduce(
      (total, ing) => total + ing.price,
      0
    );
    return selectedCoffee.price + ingredientsCost;
  };

  const handleAddToCart = () => {
    addToCart(selectedCoffee, selectedIngredients);
    setSelectedIngredients([]);
    closeModal();
  };

  const handleClose = () => {
    setSelectedIngredients([]);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <div className="modal-image">
            <img src={selectedCoffee.image} alt="" />
          </div>
          <h2 className="modal-title">{selectedCoffee.name}</h2>
          <p className="modal-description">{selectedCoffee.shortDescription}</p>
          <div className="modal-base-price">
            Base Price: {getCurrencySymbol()}
            {convertPrice(selectedCoffee.price)}
          </div>
        </div>

        <div className="modal-body">
          <h3 className="ingredients-title">Select Additional Ingredients:</h3>
          <div className="ingredients-list">
            {response.map((ingredient) => (
              <div key={ingredient.data.id} className="ingredient-item">
                <label className="ingredient-label">
                  <input
                    type="checkbox"
                    className="ingredient-checkbox"
                    onChange={(e) =>
                      handleIngredientChange(ingredient, e.target.checked)
                    }
                    checked={selectedIngredients.some(
                      (ing) => ing.data.id === ingredient.data.id
                    )}
                  />
                  <div className="ingredient-info">
                    <span className="ingredient-name">
                      {ingredient.data.name}
                    </span>
                    <span className="ingredient-price">
                      +{getCurrencySymbol()}
                      {convertPrice(ingredient.data.price)}
                    </span>
                  </div>
                  <div className="ingredient-details">
                    <span className="ingredient-strength">
                      Strength: {ingredient.data.strength}
                    </span>
                    <span className="ingredient-flavor">
                      Flavor: {ingredient.data.flavor}
                    </span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <div className="modal-total">
            <strong>
              Total: {getCurrencySymbol()}
              {convertPrice(calculateTotal())}
            </strong>
          </div>
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeModal;
