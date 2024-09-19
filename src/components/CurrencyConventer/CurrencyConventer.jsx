import  { useState, useEffect } from "react";
import useExchangeRateStore from "../../zustand/store";
import CustomSelect from "../CustomSelect/CustomSelect";
import "./CurrencyConventer.scss";
import useExchangeRate from "../../hooks/useExchangeRate";

const CurrencyConverter = () => {
  const { usdToUah, eurToUah } = useExchangeRateStore();
  const [currency1, setCurrency1] = useState("UAH");
  const [currency2, setCurrency2] = useState("USD");
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(0);

  const currencies = ["UAH", "USD", "EUR", "GBP"];

  const [getExchangeRate] = useExchangeRate();



  const handleAmount1Change = (number) => {
    let value;
    try {
      value = Number(number);
      setAmount1(value);
      const rate = getExchangeRate(currency1, currency2);
      setAmount2((value * rate).toFixed(4));
    } catch (e) {
      console.log(e);
      return;
    }
  };

  const handleAmount2Change = (number) => {
    let value;
    try {
      value = Number(number);
      setAmount2(value);
      const rate = getExchangeRate(currency2, currency1);
      setAmount1((value * rate).toFixed(4));
    } catch (e) {
      console.log(e);
      return;
    }
  };

  useEffect(() => {
    const rate = getExchangeRate(currency1, currency2);
    setAmount2((amount1 * rate).toFixed(4));
  }, [currency1, currency2, usdToUah, eurToUah]);

  return (
    <div className="converter">
      <div className="currency-box">
        <input
          type="number"
          value={amount1}
          onChange={(e) => handleAmount1Change(e.target.value)}
        />
        <CustomSelect
          options={currencies}
          value={currency1}
          onChange={setCurrency1}
        />
      </div>

      <div className="currency-box">
        <input
          type="number"
          value={amount2}
          onChange={(e) => handleAmount2Change(e.target.value)}
        />
        <CustomSelect
          options={currencies}
          value={currency2}
          onChange={setCurrency2}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;
