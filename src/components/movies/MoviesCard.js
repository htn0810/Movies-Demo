import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config";
import LoadingSkeleton from "../../loading/LoadingSkeleton";
import Button from "../button/Button";

const MoviesCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = { ...item };
  const navigate = useNavigate();
  return (
    <div className="relative p-3 rounded-lg movies-card bg-slate-800 h-[438px]">
      <img
        src={`${tmdbAPI.imageOriginal(poster_path)}`}
        alt=""
        className="object-cover w-full h-full rounded-lg"
      />
      <div className="movies-info absolute bg-gradient-to-t from-[rgba(0,0,0,1)] to-[rgba(0,0,0,0.6)] w-full rounded-lg left-0 bottom-0 p-3">
        <h3 className="mb-1 text-lg font-bold truncate hover:whitespace-normal">
          {title}
        </h3>
        <div className="flex items-center justify-between mb-2 text-sm opacity-80">
          <span className="">{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <Button
          className="w-full p-3 text-xl font-bold rounded-lg bg-primary"
          onClick={() => navigate(`/movies/${id}`)}
        >
          Watch Now
        </Button>
      </div>
    </div>
  );
};

export default MoviesCard;

export const MoviesCardSkeleton = () => {
  return (
    <>
      <div className="relative p-3 rounded-lg movies-card bg-slate-800 h-[438px]">
        <LoadingSkeleton className="object-cover w-full h-full rounded-lg"></LoadingSkeleton>
        <div className="movies-info absolute bg-gradient-to-t from-[rgba(0,0,0,1)] to-[rgba(0,0,0,0.6)] w-full rounded-lg left-0 bottom-0 p-3">
          <h3 className="mb-1 text-lg font-bold ">
            <LoadingSkeleton className="w-full h-[20px]"></LoadingSkeleton>
          </h3>
          <div className="flex items-center justify-between mb-2 text-sm opacity-80">
            <span>
              <LoadingSkeleton className="w-[50px] h-[15px]"></LoadingSkeleton>
            </span>
            <span>
              <LoadingSkeleton className="w-[50px] h-[15px]"></LoadingSkeleton>
            </span>
          </div>
          <LoadingSkeleton className="w-full h-[40px]"></LoadingSkeleton>
        </div>
      </div>
    </>
  );
};
