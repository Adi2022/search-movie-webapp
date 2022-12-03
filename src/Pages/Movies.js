import React from "react";
import { useGlobalContext } from "../Context/Context";
import { NavLink } from "react-router-dom";
import Loading from "./Loading";
const Movies = () => {
  const { movie, query, setQuery, isError, isLoading } = useGlobalContext();
  const imgUrl = "https://via.placeholder.com/200/200";
  if (isLoading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <section className="movie-page ">
        <div className="container grid grid-col-4">
          {movie
            ? movie.map((items) => {
                const { Title, Poster, Year, imdbID } = items;
                const movieName = Title.substring(0, 15);
                return (
                  <NavLink
                    to={`movie/${imdbID}`}
                    key={imdbID}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card">
                      <div className="card-info">
                        <h2 className="movie-name">
                          {movieName.length >= 15
                            ? `${movieName}...`
                            : movieName}
                        </h2>
                        <p>{Year}</p>
                        <img
                          src={Poster === "N/A" ? imgUrl : Poster}
                          alt="image"
                        />
                      </div>
                    </div>
                  </NavLink>
                );
              })
            :""}
        </div>
      </section>
    </div>
  );
};

export default Movies;
