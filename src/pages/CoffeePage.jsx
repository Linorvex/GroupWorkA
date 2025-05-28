import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CoffeeCard from "../components/coffeeCard";
import useFetch from "../hooks/useFetch";

const CoffeePage = () => {
  const { response } = useFetch({
    url: "http://localhost:5000/api/v1/resource/coffees",
    method: "GET",
  });
  if (!response) return <>loading</>;
  return (
    <div className="app-container">
      <Sidebar currentPath="/coffee" />
      <div className="main-content">
        <Header title="Coffee Selection" />
        <div className="page-content">
          <div className="coffee-grid">
            {response[0].data.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeePage;
