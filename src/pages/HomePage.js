import React, { Fragment } from "react";
import MoviesList from "../components/movies/MoviesList";

const HomePage = () => {
  return (
    <Fragment>
      <section className="mb-10 text-white movies-layout page-container">
        <h2 className="mb-10 text-xl font-bold ">Now Playing</h2>
        <MoviesList type={"now_playing"}></MoviesList>
      </section>
      <section className="mb-10 text-white movies-layout page-container">
        <h2 className="mb-10 text-xl font-bold ">Top Rated</h2>
        <MoviesList type={"top_rated"}></MoviesList>
      </section>
      <section className="mb-10 text-white movies-layout page-container">
        <h2 className="mb-10 text-xl font-bold ">Trending</h2>
        <MoviesList type={"popular"}></MoviesList>
      </section>
    </Fragment>
  );
};

export default HomePage;
