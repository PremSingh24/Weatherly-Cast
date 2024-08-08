import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BackgroundLayout, NavBar, Toast } from "./components";
import WeatherPage from "./pages/weatherPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import useGetFavCity from "./hooks/getFavCity";
import useGetWeather from "./hooks/getWeather";
import NotFoundPage from "./pages/notFoundPage";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  useGetFavCity();
  useGetWeather();
  return (
    <BrowserRouter>
      <BackgroundLayout>
        <NavBar setLoading={setLoading} />
        <Routes>
          <Route index element={<WeatherPage loading={loading} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toast />
      </BackgroundLayout>
    </BrowserRouter>
  );
}

export default App;
