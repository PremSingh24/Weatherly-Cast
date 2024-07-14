import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WeatherContextProvider } from "./context/weather";
import { ToastContextProvider } from "./context/toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WeatherContextProvider>
      <ToastContextProvider>
        <App />
      </ToastContextProvider>
    </WeatherContextProvider>
  </React.StrictMode>
);
