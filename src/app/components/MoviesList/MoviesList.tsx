import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MovieCard from "../MovieCard/MovieCard";

const MoviesList: React.FC = () => {
  const movies = useSelector((state: RootState) => state.movies.results);

  return (
    <div className="grid grid-cols-1 gap-4 pb-24 sm:grid-cols-2 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;
