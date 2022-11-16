export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "2617a84c1e75abc6d84284f64fc81884";
export const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
export const tmdbAPI = {
  getMovieList: (type, otherPath = "", page = 1) =>
    `${tmdbEndpoint}/${type}/${otherPath}?api_key=${apiKey}&page=${page}`,
  getMovieDetails: (moviesId) =>
    `${tmdbEndpoint}/${moviesId}?api_key=${apiKey}`,
  getMovieMeta: (moviesId, type) =>
    `${tmdbEndpoint}/${moviesId}/${type}?api_key=${apiKey}`,
  getMovieSearch: (query, nextPage) =>
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${nextPage}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
};
