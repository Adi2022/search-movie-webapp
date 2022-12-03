import React from "react";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";
import SingleMoviePage from "./Pages/SingleMoviePage";
import './App.css';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="movie/:id" element={<SingleMoviePage />} />
      </Routes>
    </div>
  );
};

export default App;
