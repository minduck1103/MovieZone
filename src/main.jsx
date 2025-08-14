import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HotMoviesPage from "./pages/HotMoviesPage";
import PopularMoviesPage from "./pages/PopularMoviesPage";
import GenresPage from "./pages/genres";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/hot-movies" element={<HotMoviesPage />} />
        <Route path="/popular-movies" element={<PopularMoviesPage />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/genres/:genreId" element={<GenresPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);