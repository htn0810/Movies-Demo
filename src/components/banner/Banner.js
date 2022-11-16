import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetcher } from "../../config";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=2617a84c1e75abc6d84284f64fc81884`,
    fetcher
  );
  const movies = (data && data.results) || [];
  return (
    <Swiper grabCursor="true" slidesPerView={"auto"}>
      {movies.length > 0 &&
        movies.map((item) => (
          <SwiperSlide key={item.id}>
            <BannerItem item={item}></BannerItem>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

function BannerItem({ item }) {
  const navigate = useNavigate();
  const { backdrop_path, title } = { ...item };
  return (
    <section className="banner h-[500px] page-container rounded-lg relative mb-10">
      <div className="absolute inset-0 overlay bg-gradient-to-t rounded-lg from-[rgba(0,0,0,0.75)] to-[rgba(0,0,0,0.25)]"></div>
      <div className="w-full h-full rounded-lg">
        <img
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt=""
          className="object-cover object-right-top w-full h-full rounded-lg"
        />
      </div>
      <div className="absolute w-full text-white left-5 bottom-5">
        <h2 className="mb-5 text-4xl font-bold">{title}</h2>
        <BannerCategory moviesId={item.id}></BannerCategory>
        <Button
          onClick={() => navigate(`/movies/${item.id}`)}
          className="p-3 text-lg font-bold rounded-lg bg-primary"
        >
          Watch Now
        </Button>
      </div>
    </section>
  );
}

function BannerCategory({ moviesId }) {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${moviesId}?api_key=2617a84c1e75abc6d84284f64fc81884`,
    fetcher
  );
  if (!data) return null;
  // console.log(data);
  const { genres } = data;
  return (
    <div className="flex items-center mb-5 gap-x-3">
      {genres.length > 0 &&
        genres.map((item) => (
          <span className="px-3 py-2 border-primary border-[3px]  rounded-md ">
            {item.name}
          </span>
        ))}
    </div>
  );
}

export default Banner;
