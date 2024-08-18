import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import guestSessionReducer from "./guestSessionSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    guestSession: guestSessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
