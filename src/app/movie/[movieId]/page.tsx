"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";
import axios from "axios";
import { setMovieDetails, MovieDetails } from "../../../app/redux/moviesSlice";
import RatingForm from "../../components/RatingForm/RatingForm";

const MovieDetailsPage = ({ params }: { params: { movieId: string } }) => {
  const movieId = Number(params.movieId);
  const dispatch = useDispatch();
  const movie = useSelector((state: RootState) => state.movies.movieDetails);

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PERSONAL}`,
          },
        },
      );

      dispatch(setMovieDetails(response.data));
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full max-w-xs rounded-lg"
        />
        <h1 className="my-4 text-3xl font-bold">{movie.title}</h1>
        <p className="mb-4 text-lg text-gray-700">{movie.overview}</p>
        <p className="text-sm text-gray-600">
          Release Date: {movie.release_date}
        </p>
        <p className="text-sm text-gray-600">
          Rating: {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {movie.genres.map((genre) => (
            <span
              key={genre.id}
              className="rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
      <RatingForm movieId={movieId} />
    </div>
  );
};

export default MovieDetailsPage;
