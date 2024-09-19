import useExchangeRateStore from "../zustand/store";

export default function useExchangeRate() {
  const { usdToUah, eurToUah, gbpToUah } = useExchangeRateStore();

  const getExchangeRate = (fromCurrency, toCurrency) => {
    if (fromCurrency === "UAH") {
      if (toCurrency === "USD") return 1 / usdToUah;
      if (toCurrency === "EUR") return 1 / eurToUah;
      if (toCurrency === "GBP") return 1 / gbpToUah;
    } else if (fromCurrency === "USD") {
      if (toCurrency === "UAH") return usdToUah;
      if (toCurrency === "EUR") return usdToUah / eurToUah;
      if (toCurrency === "GBP") return usdToUah / gbpToUah;
    } else if (fromCurrency === "EUR") {
      if (toCurrency === "UAH") return eurToUah;
      if (toCurrency === "USD") return eurToUah / usdToUah;
      if (toCurrency === "GBP") return eurToUah / gbpToUah;
    } else if (fromCurrency === "GBP") {
      if (toCurrency === "UAH") return gbpToUah;
      if (toCurrency === "USD") return gbpToUah / usdToUah;
      if (toCurrency === "EUR") return gbpToUah / eurToUah;
    }
    return 1;
  };

  return [getExchangeRate, usdToUah, eurToUah, gbpToUah];
}
