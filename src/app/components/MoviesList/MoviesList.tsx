import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MovieCard from "../MovieCard/MovieCard";
import { Movie } from "../../redux/moviesSlice";

const MoviesList: React.FC = () => {
  const movies: Movie[] = useSelector(
    (state: RootState) => state.movies.results,
  );

  return (
    <div className="grid grid-cols-1 gap-4 pb-24 pt-8 sm:grid-cols-2 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;
