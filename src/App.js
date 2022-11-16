import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Banner from "./components/banner/Banner";

import Main from "./components/layout/Main";
import ErrorPage from "./errorpage/ErrorPage";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesDetailPage = lazy(() => import("./pages/MoviesDetailPage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviesPage></MoviesPage>}>
              <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
            </Route>
            <Route
              path="/movies/:moviesId"
              element={<MoviesDetailPage></MoviesDetailPage>}
            ></Route>
          </Route>
          <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
