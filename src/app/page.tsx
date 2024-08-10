"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}
interface MoviesResponse {
  results: Movie[];
  total_pages: number;
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const fetchMovies = async (page: number) => {
    try {
      const response = await axios.get<MoviesResponse>(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        },
      );
      setMovies(response.data.results);
      console.log(response.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4 pb-24 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="overflow-hidden rounded-lg bg-white shadow-md"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full object-cover"
            />
            <div className="p-4">
              <h5 className="mb-2 text-xl font-bold text-black">
                {movie.title}
              </h5>
              <p className="text-sm text-gray-700">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center space-x-4 bg-gray-800 p-3 text-white">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded bg-gray-600 px-4 py-2 text-sm hover:bg-gray-500 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm font-bold">{currentPage}</span>
        <span className="text-sm font-bold">/ {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="rounded bg-gray-600 px-4 py-2 text-sm hover:bg-gray-500 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default Home;
