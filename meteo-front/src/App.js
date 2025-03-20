// src/routes/AppRouter.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/homePage";
import PaysPage from "./pages/paysPage";
import VillePage from './pages/villesPage';
import WeatherPage from './pages/weatherPage';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

const AppRouter = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pays" element={<PaysPage />} />
          <Route path="/pays/:paysId/villes" element={<VillePage />} />
          <Route path="/villes/:villeId/meteo" element={<WeatherPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default AppRouter;
