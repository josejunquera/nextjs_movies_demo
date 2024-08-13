"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setMovies, setPage } from "../../redux/moviesSlice";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (query.trim() === "") return;

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1&include_adult=false`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PERSONAL}`,
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
      dispatch(setPage(1));
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
