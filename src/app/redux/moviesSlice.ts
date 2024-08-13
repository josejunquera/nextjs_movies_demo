import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
}

interface MoviesState {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
  movieDetails: MovieDetails | null;
}

const initialState: MoviesState = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
  movieDetails: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<MoviesState>) {
      const { page, results, total_pages, total_results } = action.payload;
      state.page = page;
      state.results = results;
      state.total_pages = total_pages;
      state.total_results = total_results;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setMovieDetails(state, action: PayloadAction<MovieDetails>) {
      state.movieDetails = action.payload;
    },
  },
});

export const { setMovies, setPage, setMovieDetails } = moviesSlice.actions;
export default moviesSlice.reducer;
