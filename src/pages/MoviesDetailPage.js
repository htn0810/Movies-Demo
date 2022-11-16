import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import MoviesList from "../components/movies/MoviesList";

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=2617a84c1e75abc6d84284f64fc81884

const MoviesDetailPage = () => {
  const { moviesId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieDetails(moviesId), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = {
    ...data,
  };

  return (
    <Fragment>
      <div className="px-20">
        <div
          className="w-full h-[500px] bg-no-repeat bg-cover rounded-lg relative"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        >
          <div className="absolute inset-0 from-[rgba(0,0,0,0.75)] to-[rgba(0,0,0,0)] bg-gradient-to-t"></div>
        </div>
        <div className="w-full h-[400px] max-w-[300px] mx-auto -mt-[250px] relative mb-10">
          <img
            src={`${tmdbAPI.imageOriginal(poster_path)}`}
            alt=""
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <h1 className="mb-10 text-4xl font-bold text-center text-white">
          {title}
        </h1>
        {genres.length > 0 && (
          <div className="flex items-center justify-center mb-10 text-white text-opacity-70 gap-x-5">
            {genres.map((item) => (
              <span
                key={item.id}
                className="px-4 py-2 rounded-lg border-primary border-[3px]"
              >
                {item.name}
              </span>
            ))}
          </div>
        )}
        <div className="text-white bg-slate-800 max-w-[600px] mx-auto p-5 rounded-lg mb-10">
          <p className="leading-relaxed text-justify opacity-50">{overview}</p>
        </div>
        <MoviesCredits></MoviesCredits>
        <MoviesTrailer></MoviesTrailer>
        <MoviesSimilar></MoviesSimilar>
      </div>
    </Fragment>
  );
};

function MoviesCredits() {
  const { moviesId } = useParams();
  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(moviesId, "credits"),
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  // console.log(data);
  return (
    <Fragment>
      <div className="p-10 mb-10 text-white rounded-lg movies-cast bg-slate-800">
        <h2 className="mb-10 text-3xl font-semibold text-center">Cast</h2>
        <Swiper grabCursor="true" spaceBetween={40} slidesPerView={"auto"}>
          {cast.length > 0 &&
            cast.map((item) => {
              if (!item.profile_path) return null;
              return (
                <SwiperSlide key={item.id}>
                  <div className="w-[255px]">
                    <img
                      src={`${tmdbAPI.imageOriginal(item.profile_path)}`}
                      alt=""
                      className="object-cover w-full h-full mb-5 rounded-lg"
                    />
                    <span className="text-xl font-semibold text-center">
                      {item.name}
                    </span>
                    <span className="text-xl font-semibold text-center opacity-50">
                      {` (${item.character})`}
                    </span>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </Fragment>
  );
}

function MoviesTrailer() {
  const { moviesId } = useParams();
  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(moviesId, "videos"),
    fetcher
  );
  if (!data) return null;
  // console.log(data);
  let linkTrailer = "";
  for (let i = 0; i < data.results.length; i++) {
    // console.log(data.results[i].key);
    if (
      data.results[i].type === "Clip" ||
      data.results[i].type === "Trailer" ||
      data.results[i].name === "Official Trailer"
    ) {
      linkTrailer = data.results[i].key;
    }
  }
  console.log(linkTrailer);
  return (
    <div className="w-full mb-10 overflow-hidden text-white bg-slate-800 aspect-video rounded-2xl">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${linkTrailer}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

function MoviesSimilar() {
  const { moviesId } = useParams();

  return (
    <Fragment>
      <h2 className="py-3 mb-10 text-2xl font-bold text-center text-white rounded-lg opacity-80 bg-slate-800">
        Related Movies
      </h2>
      <div className="w-full mb-10 text-white rounded-lg ">
        <Swiper grabCursor="true" spaceBetween={40} slidesPerView={"auto"}>
          <MoviesList otherPath={`similar`} type={moviesId}></MoviesList>
        </Swiper>
      </div>
    </Fragment>
  );
}

export default MoviesDetailPage;
