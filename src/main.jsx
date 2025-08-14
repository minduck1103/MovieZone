import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MoviesPage from "./pages/movies";
import GenresPage from "./pages/genres";
import TVShowsPage from "./pages/tv";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/genres" element={<GenresPage />} />
        <Route path="/genres/:genreId" element={<GenresPage />} />
        <Route path="/tv" element={<TVShowsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);