"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface RatedMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

const MyList = () => {
  const [ratedMovies, setRatedMovies] = useState<RatedMovie[]>([]);
  const [message, setMessage] = useState<string>("");
  const { guestSessionId, isLoggedIn } = useSelector(
    (state: RootState) => state.guestSession,
  );

  useEffect(() => {
    if (guestSessionId && isLoggedIn) {
      fetchRatedMovies(guestSessionId);
    }
  }, [guestSessionId]);

  const fetchRatedMovies = async (guestSessionId: string) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-US&sort_by=created_at.asc`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PERSONAL}`,
          },
        },
      );

      if (response.data.results && response.data.results.length > 0) {
        setRatedMovies(response.data.results);
        console.log("Rated movies fetched:", response.data.results);
      } else {
        setMessage("No rated movies found.");
      }
    } catch (error) {
      console.error("Error fetching rated movies:", error);
      setMessage("Failed to fetch rated movies. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">My Rated Movies</h1>
      {message && <p>{message}</p>}
      {ratedMovies.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {ratedMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg"
              />
              <h2 className="mt-2 text-lg font-bold">{movie.title}</h2>
              <p className="text-sm">
                Rating: {movie.vote_average.toFixed(1)} ({movie.vote_count}{" "}
                votes)
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No rated movies found. Start rating some movies!</p>
      )}
    </div>
  );
};

export default MyList;
