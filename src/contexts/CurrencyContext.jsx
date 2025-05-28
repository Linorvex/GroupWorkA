import React, { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("GEL");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://bankofgeorgia.ge/api/currencies/convert/USD/GEL?amountFrom=1"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.data && data.data.rate) {
          setExchangeRate(data.data.rate);
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (err) {
        console.error("Failed to fetch exchange rate:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, []);

  const convertPrice = (gelPrice) => {
    if (!exchangeRate) return "...";

    if (currency === "USD") {
      return (gelPrice / exchangeRate).toFixed(2);
    }
    return gelPrice?.toFixed(2);
  };

  const getCurrencySymbol = () => (currency === "USD" ? "$" : "₾");

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertPrice,
        getCurrencySymbol,
        exchangeRate,
        loading,
        error,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

const useCurrency = () => useContext(CurrencyContext);

export { CurrencyProvider, useCurrency };
