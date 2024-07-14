import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BackgroundLayout, NavBar } from "./components";
import WeatherPage from "./pages/weatherPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import Toast from "./components/toast";

function App() {
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
