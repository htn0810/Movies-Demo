import React, { useEffect, useState } from "react";
import MoviesCard from "./MoviesCard";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";

// https://api.themoviedb.org/3/movie/now_playing?api_key=2617a84c1e75abc6d84284f64fc81884

const MoviesList = ({ type = "now_playing", otherPath = "" }) => {
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR(
    tmdbAPI.getMovieList(type, otherPath),
    fetcher
  );
  useEffect(() => {
    if (data && data.results) {
      setMovies(data.results);
    }
  }, [data]);
  // console.log(movies);
  return (
    <div className="movies-list">
      <Swiper grabCursor="true" spaceBetween={25} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MoviesCard item={item}></MoviesCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MoviesList;
