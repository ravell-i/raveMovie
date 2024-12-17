import React from "react";
import Slider from "react-slick";
import { Settings } from "../../common/settings";
import "./MovieListing.scss";
import { useSelector } from "react-redux";
import {
  getAllMovies,
  getAllShows,
  isLoading,
} from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";

const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);
  const loading = useSelector(isLoading);

  const renderItems = (items, type) => {
    if (loading) {
      return <div className="loading">Loading...</div>;
    }
    if (items?.Response === "True") {
      return items.Search.map((item, index) => (
        <MovieCard key={index} data={item} />
      ));
    }
    return (
      <div className="movies-error">
        <h3>{items?.Error || `No ${type} found!`}</h3>
      </div>
    );
  };

  return (
    <div className="movie-wrapper">
      {/* Movies Section */}
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">
          <Slider {...Settings}>{renderItems(movies, "movies")}</Slider>
        </div>
      </div>

      {/* Shows Section */}
      <div className="show-list">
        <h2>Shows</h2>
        <div className="movie-container">
          <Slider {...Settings}>{renderItems(shows, "shows")}</Slider>
        </div>
      </div>
    </div>
  );
};

export default MovieListing;
