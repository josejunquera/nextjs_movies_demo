"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";
import axios from "axios";
import { setMovieDetails, MovieDetails } from "../../../app/redux/moviesSlice";
import Header from "@/app/components/Header/Header";
import RatingForm from "../../components/RatingForm/RatingForm";

interface MovieDetailsPageProps {
  params: {
    movieId: string;
  };
}

const MovieDetailsPage: React.FC<MovieDetailsPageProps> = ({ params }) => {
  const movieId = Number(params.movieId);
  const dispatch = useDispatch();
  const movie = useSelector<RootState, MovieDetails | null>(
    (state) => state.movies.movieDetails,
  );
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
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-start text-white md:flex-row md:items-start lg:gap-6">
          <div className="flex w-full justify-center md:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full max-w-[500px] rounded-lg"
            />
          </div>

          <div className="mt-6 w-full md:mt-0 md:w-2/3 md:pl-8">
            <h1 className="text-2xl font-bold md:text-3xl">{movie.title}</h1>
            <p className="pt-4 font-bold md:text-lg">
              Release Date:{" "}
              {new Date(movie.release_date).toLocaleDateString("es-ES")}
            </p>
            <div className="flex flex-wrap gap-2 py-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-gray-700 px-3 py-1 text-sm font-semibold"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="mb-4">{movie.overview}</p>
            <p className="md:text-lg">
              Rating: {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
            </p>
            <RatingForm movieId={movieId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetailsPage;
