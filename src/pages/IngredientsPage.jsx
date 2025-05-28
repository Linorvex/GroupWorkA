import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useCurrency } from "../contexts/CurrencyContext";
import useFetch from "../hooks/useFetch";
const IngredientsPage = () => {
  const { convertPrice, getCurrencySymbol } = useCurrency();
  const navigate = useNavigate();
  const { response } = useFetch({
    url: "http://localhost:5000/api/v1/resource/ingredients",
    method: "GET",
  });
  if (!response) return <>loading</>;
  console.log(response);
  return (
    <div className="app-container">
      <Sidebar currentPath="/ingredients" />
      <div className="main-content">
        <Header title="Manage Ingredients" />
        <div className="page-content">
          <div className="ingredients-table">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Strength</th>
                  <th>Flavor</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {response.map((ingredient) => (
                  <tr key={ingredient.data.id} className="table-row">
                    <td className="table-cell">{ingredient.data.id}</td>
                    <td className="table-cell name">{ingredient.data.name}</td>
                    <td className="table-cell">
                      {getCurrencySymbol()}
                      {convertPrice(ingredient.data.price)}
                    </td>
                    <td className="table-cell">{ingredient.data.strength}</td>
                    <td className="table-cell">{ingredient.data.flavor}</td>
                    <td className="table-cell">
                      <div className="table-actions">
                        <button
                          className="btn-small btn-detail"
                          onClick={() =>
                            navigate(`/ingredients/${ingredient.data.id}`)
                          }
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IngredientsPage;
