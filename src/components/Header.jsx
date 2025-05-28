import React from "react";
import { useCurrency } from "../contexts/CurrencyContext";

const Header = ({ title }) => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="header">
      <div className="header-content">
        <h1 className="header-title">{title}</h1>
        <div className="currency-selector">
          <span className="currency-label">Currency:</span>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="currency-select"
          >
            <option value="GEL">GEL (₾)</option>
            <option value="USD">USD ($)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
