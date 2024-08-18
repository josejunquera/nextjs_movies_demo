"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "./redux/store";
import { setMovies, setPage } from "./redux/moviesSlice";
import Header from "./components/Header/Header";
import MoviesList from "./components/MoviesList";
import Pagination from "./components/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.movies.page);
  const totalPages = useSelector(
    (state: RootState) => state.movies.total_pages,
  );
  const movies = useSelector((state: RootState) => state.movies.results);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [movies]);

  const fetchMovies = async (page: number) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PERSONAL}`,
          },
        },
      );

      dispatch(
        setMovies({
          page,
          results: response.data.results,
          total_pages: response.data.total_pages,
          total_results: response.data.total_results,
          movieDetails: null,
          ratedMovies: [],
        }),
      );
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setPage(page));
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto py-4">
        <MoviesList />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </>
  );
};

export default Home;
