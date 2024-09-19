import {  useEffect } from "react";
import "./Header.scss";
import useExchangeRateStore from "../../zustand/store";

const Header = () => {
 const { usdToUah, eurToUah, fetchRates } = useExchangeRateStore();

 useEffect(() => {
   fetchRates(); 
 }, [fetchRates]);

  return (
    <header
      className="header"
      style={{
        padding: "10px",
        backgroundColor: "#f0f0f0",
        textAlign: "center",
      }}
    >
      {!usdToUah && !eurToUah ? (
        <p>Loading exchange rates...</p>
      ) : (
        <div>
          <p>Exchange Rates (UAH):</p>
          <div className="exchange-rates">
            <p>1 USD = {usdToUah.toFixed(4)} UAH</p>
            <p>1 EUR = {eurToUah.toFixed(4)} UAH</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
