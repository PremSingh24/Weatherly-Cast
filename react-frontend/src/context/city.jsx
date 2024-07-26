import { createContext, useContext, useState } from "react";

const cityContext = createContext();

export const CityContextProvider = ({ children }) => {
  const [favCity, setFavCity] = useState([]);
  return (
    <cityContext.Provider value={{ favCity, setFavCity }}>
      {children}
    </cityContext.Provider>
  );
};

export const useCityContext = () => useContext(cityContext);
