import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieDetailContext";
import MoviesPage from "./pages/movies";
import GenresPage from "./pages/genres";
import TVShowsPage from "./pages/tv";
import MovieDetailPage from "./pages/movie-detail";
import TVDetailPage from "./pages/tv-detail";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MovieProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/genres/:genreId" element={<GenresPage />} />
          <Route path="/tv" element={<TVShowsPage />} />
          <Route path="/tv/:id" element={<TVDetailPage />} />
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  </React.StrictMode>
);