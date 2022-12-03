import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../Context/Context";
import { NavLink } from "react-router-dom";
import Loading from "./Loading";
import { API_URL } from "../Context/Context";

const SingleMoviePage = () => {

  const { id } = useParams();
  console.log(id)
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState("");
  const [isError, setIsError] = useState({ show: false, msg: "" });

  const getAllMovies = async (url) => {
    setIsLoading(true);

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data);
      } else {
      }
      setIsError({
        show: true,
        msg: data.Error,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timerOut = setTimeout(() => {
      getAllMovies(`${API_URL}&i=${id}`);
    }, 500);

    return () => clearTimeout(timerOut);
  }, [id]);

  if (isLoading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }
  return (
    <section className="movie-section">
    <div className="movie-card">
    <figure>
          <img src={movie.Poster} alt="" />
        </figure>
      <div className="card-content">
        <p className="title">{movie.Title}</p>
        <p className=""></p>
        <p className="card-text">{movie.Released}</p>
        <p className="card-text">{movie.Genre}</p>
        <p className="card-text">{movie.imdbRating}/10</p>
        <p className="card-text">{movie.Country}</p>
        <NavLink to="/" className="back-btn">
         <button>Go Back</button>
        </NavLink>
      </div>
    </div>
  </section>
  );
};

export default SingleMoviePage;
