import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WeatherContextProvider } from "./context/weather";
import { ToastContextProvider } from "./context/toast";
import { CityContextProvider } from "./context/city";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WeatherContextProvider>
      <ToastContextProvider>
        <CityContextProvider>
          <App />
        </CityContextProvider>
      </ToastContextProvider>
    </WeatherContextProvider>
  </React.StrictMode>
);
