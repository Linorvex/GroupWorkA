import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useCurrency } from "../contexts/CurrencyContext";
import useFetch from "../hooks/useFetch";

const IngredientDetailPage = () => {
  const { id } = useParams();
  const { convertPrice, getCurrencySymbol } = useCurrency();
  const { response } = useFetch({
    url: "http://localhost:5000/api/v1/resource/ingredients",
    method: "GET",
  });
  if (!response) return <>loading</>;
  const ingredient = response.find((i) => i.id === id);

  if (!ingredient) return <div>Ingredient not found</div>;

  return (
    <div className="app-container">
      <Sidebar currentPath="/ingredients" />
      <div className="main-content">
        <Header title="Ingredient Details" />
        <div className="page-content">
          <div className="detail-container">
            <div className="detail-header">
              <h1 className="detail-title">{ingredient.data.name}</h1>
              <div className="detail-price">
                {getCurrencySymbol()}
                {convertPrice(ingredient.data.price)}
              </div>
            </div>

            <div className="detail-description">
              <p>
                <strong>Strength:</strong> {ingredient.data.strength}
              </p>
              <p>
                <strong>Flavor:</strong> {ingredient.data.flavor}
              </p>
              <br />
              <p>{ingredient.data.description}</p>
            </div>

            <Link to="/ingredients" className="back-button">
              <ArrowLeft size={16} />
              Back to Ingredients
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetailPage;
