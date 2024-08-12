"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setMovies, setPage } from "../../redux/moviesSlice";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (query.trim() === "") return; // No hacer búsqueda si el query está vacío

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1&include_adult=false`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2Q2NjIzZmJjOGVjOGU0OGExYzUyNjU4ZTBlYjg0MyIsInN1YiI6IjY1ZjRhZTg2NTExZDA5MDE3ZDM5YjkyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._L-nRJbFrPwmJUfhjY7fqyZjRiMfZW0T9Iw6_7DiB9E`,
          },
        },
      );

      dispatch(
        setMovies({
          page: 1,
          results: response.data.results,
          total_pages: response.data.total_pages,
          total_results: response.data.total_results,
          movieDetails: null,
        }),
      );
      dispatch(setPage(1)); // Reset to the first page
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for movies..."
        className="rounded border border-gray-300 p-2 text-black"
      />
      <button
        onClick={handleSearch}
        className="ml-2 rounded bg-blue-500 p-2 text-white"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
