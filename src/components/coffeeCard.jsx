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
  if (!response) return <>loading . . .</>;
  console.log(Array.isArray(response));
  console.log(response);
  return (
    <div className="app-container">
      <Sidebar currentPath="/coffee" />
      <div className="main-content">
        <Header title="Coffee Selection" />
        <div className="page-content">
          <div className="coffee-grid">
            {response.map((coffee) => (
              <CoffeeCard key={coffee.data.id} coffee={coffee.data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoffeePage;
