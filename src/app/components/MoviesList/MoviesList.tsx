import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Movie } from "../../redux/moviesSlice";
import Spinner from "../Spinner/Spinner";

const MovieCard = React.lazy(() => import("../MovieCard/MovieCard"));

const MoviesList: React.FC = () => {
  const movies: Movie[] = useSelector(
    (state: RootState) => state.movies.results,
  );

  return (
    <div className="grid grid-cols-1 gap-4 pb-24 pt-8 sm:grid-cols-2 lg:grid-cols-4">
      <Suspense fallback={<Spinner />}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Suspense>
    </div>
  );
};

export default MoviesList;
