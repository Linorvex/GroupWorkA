import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useCurrency } from "../contexts/CurrencyContext";
import { useCart } from "../contexts/CartContext";
import useFetch from "../hooks/useFetch";

const CoffeeDetailPage = () => {
  const { response } = useFetch({
    url: "http://localhost:5000/api/v1/resource/coffees",
    method: "GET",
  });
  const { id } = useParams();
  const { convertPrice, getCurrencySymbol } = useCurrency();
  const { openModal } = useCart();
  if (!response) return <>loading</>;
  const coffee = response.find((c) => c.id === parseInt(id));

  if (!coffee) return <div>Coffee not found</div>;
  return (
    <div className="app-container">
      <Sidebar currentPath="/coffee" />
      <div className="main-content">
        <Header title="Coffee Details" />
        <div className="page-content">
          <div className="detail-container">
            <div className="detail-header">
              <img
                className="detail-img"
                src={coffee.data.image}
                alt={coffee.data.name}
              />
              <h1 className="detail-title">{coffee.data.name}</h1>
              <div className="detail-price">
                {getCurrencySymbol()}
                {convertPrice(coffee.data.price)}
              </div>
            </div>

            <div className="detail-description">
              <p>{coffee.data.fullDescription}</p>
            </div>

            <div className="detail-actions">
              <button
                className="btn btn-primary"
                onClick={() => openModal(coffee.data)}
              >
                Add to Cart
              </button>
            </div>

            <Link to="/coffee" className="back-button">
              <ArrowLeft size={16} />
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeDetailPage;
