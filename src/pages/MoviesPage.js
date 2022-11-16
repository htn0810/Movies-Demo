import React, { Fragment, useEffect, useState } from "react";
// import MoviesList from "../components/movies/MoviesList";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import MoviesCard, {
  MoviesCardSkeleton,
} from "../components/movies/MoviesCard";
import ReactPaginate from "react-paginate";
import { Swiper, SwiperSlide } from "swiper/react";

const MoviesPage = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);

  const [api, setApi] = useState(
    // `https://api.themoviedb.org/3/movie/upcoming?api_key=2617a84c1e75abc6d84284f64fc81884&page=${nextPage}`,
    tmdbAPI.getMovieList("upcoming", "", nextPage)
  );
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR(api, fetcher);
  const itemsPerPage = 20;

  const loading = !data && !error;
  useEffect(() => {
    if (data && data.results) {
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setTotalResults(data.total_results);
      console.log(data);
    }
  }, [data, nextPage]);
  useEffect(() => {
    if (query) {
      setApi(
        tmdbAPI.getMovieSearch(query, nextPage)
        // `https://api.themoviedb.org/3/search/movie?api_key=2617a84c1e75abc6d84284f64fc81884&query=${query}&page=${nextPage}`
      );
    } else {
      setApi(tmdbAPI.getMovieList("upcoming", "", nextPage));
    }
  }, [query, nextPage]);

  useEffect(() => {
    if (!data) return;
    setPageCount(Math.ceil(totalResults / itemsPerPage));
  }, [data, itemOffset, itemsPerPage, totalResults]);

  const handlePageClick = (event) => {
    console.log(event.selected);
    const newOffset = (event.selected * itemsPerPage) % totalResults;
    console.log("itemPP" + itemsPerPage + "totalP" + totalPages);

    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
    console.log(newOffset + "newoffset");
  };

  return (
    <div className="px-20 py-10 text-white">
      <div className="flex items-center mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full px-10 py-4 text-white rounded-lg outline-none bg-slate-800"
            placeholder="Search..."
            onChange={(e) => {
              setTimeout(() => {
                setQuery(e.target.value);
                setNextPage(1);
                setItemOffset(0);
              }, 1000);
            }}
          />
        </div>
        <button className="flex items-center justify-center w-16 p-4 rounded-md bg-primary ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-9 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="grid grid-cols-4 gap-10 mb-10">
          <MoviesCardSkeleton></MoviesCardSkeleton>
          <MoviesCardSkeleton></MoviesCardSkeleton>
          <MoviesCardSkeleton></MoviesCardSkeleton>
          <MoviesCardSkeleton></MoviesCardSkeleton>
          <MoviesCardSkeleton></MoviesCardSkeleton>
          <MoviesCardSkeleton></MoviesCardSkeleton>
          <MoviesCardSkeleton></MoviesCardSkeleton>
          <MoviesCardSkeleton></MoviesCardSkeleton>
        </div>
      )}
      {/* <div className="w-10 h-10 m-auto mb-10 border-4 rounded-full border-primary border-t-transparent animate-spin"></div> */}
      {!loading && (
        <div className="grid grid-cols-4 gap-10 mb-10">
          {movies.length > 0 &&
            movies.map((item) => (
              <MoviesCard key={item.id} item={item}></MoviesCard>
            ))}
        </div>
      )}
      <div className="mt-10 ">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default MoviesPage;
