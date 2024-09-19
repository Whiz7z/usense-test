import {create} from "zustand";
import { persist } from "zustand/middleware";
const ACCESS_KEY = import.meta.env.VITE_REACT_APP_ACCESS_KEY;


const useExchangeRateStore = create(
  persist(
    (set) => ({
      usdToUah: 0,
      eurToUah: 0,
      gbpToUah: 0,
      fetchRates: async () => {
        try {
          const responseUsd = await fetch(
            `https://v6.exchangerate-api.com/v6/${ACCESS_KEY}/pair/USD/UAH`
          );
          const dataUsd = await responseUsd.json();
          if (dataUsd.result === "success") {
            set({ usdToUah: dataUsd.conversion_rate });
          } else {
            console.error("Error fetching USD to UAH exchange rate:", dataUsd);
          }

          const responseEur = await fetch(
            `https://v6.exchangerate-api.com/v6/${ACCESS_KEY}/pair/EUR/UAH`
          );
          const dataEur = await responseEur.json();
          if (dataEur.result === "success") {
            set({ eurToUah: dataEur.conversion_rate });
          } else {
            console.error("Error fetching EUR to UAH exchange rate:", dataEur);
          }

          const responseGBP = await fetch(
            `https://v6.exchangerate-api.com/v6/${ACCESS_KEY}/pair/GBP/UAH`
          );
          const dataGbp = await responseGBP.json();
          if (dataGbp.result === "success") {
            set({ gbpToUah: dataGbp.conversion_rate });
          } else {
            console.error("Error fetching USD to UAH exchange rate:", dataGbp);
          }
        } catch (error) {
          console.error("Error fetching exchange rates:", error);
        }
      },
    }),
    {
      name: "exchange-rate-storage", 
      getStorage: () => localStorage, 
    }
  )
);

export default useExchangeRateStore;
