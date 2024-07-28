import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BackgroundLayout, NavBar, Toast } from "./components";
import WeatherPage from "./pages/weatherPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import useGetFavCity from "./hooks/getFavCity";
import useGetWeather from "./hooks/getWeather";

function App() {
  useGetFavCity();
  useGetWeather();
  return (
    <BrowserRouter>
      <BackgroundLayout>
        <NavBar />
        <Routes>
          <Route index element={<WeatherPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Toast />
      </BackgroundLayout>
    </BrowserRouter>
  );
}

export default App;
