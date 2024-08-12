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

interface MoviesState {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const initialState: MoviesState = {
  page: 1,
  results: [],
  total_pages: 0,
  total_results: 0,
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
  },
});

export const { setMovies, setPage } = moviesSlice.actions;
export default moviesSlice.reducer;
