import React from "react";
import { Movie } from "../../redux/moviesSlice";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-md">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full object-cover"
      />
      <div className="p-4 pb-20">
        <h5 className="mb-2 text-xl font-bold text-black sm:line-clamp-2 sm:h-14">
          {movie.title}
        </h5>
        <p className="text-sm text-gray-700 sm:line-clamp-6">
          {movie.overview}
        </p>
      </div>
      <div className="absolute bottom-0 flex h-14 w-full gap-4 bg-gray-400 p-4 align-middle text-lg">
        {movie.vote_count > 0 ? (
          <>
            <div className="flex h-fit items-center gap-1">
              <img src="/icons/star.svg" alt="star" className="h-4 w-auto" />
              <p className="font-bold">{movie.vote_average.toFixed(1)}</p>
            </div>
            <p>({movie.vote_count})</p>
          </>
        ) : (
          <p className="font-semibold italic">Not rated</p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
