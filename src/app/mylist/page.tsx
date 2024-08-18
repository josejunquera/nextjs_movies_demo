"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setRatedMovies } from "../redux/moviesSlice";
import Header from "../components/Header/Header";
import RatedMoviesList from "../components/RatedMoviesList/RatedMoviesList";

const MyList = () => {
  const dispatch = useDispatch();
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
        dispatch(setRatedMovies(response.data.results));
      } else {
        dispatch(setRatedMovies([]));
      }
    } catch (error) {
      console.error("Error fetching rated movies:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold">My Rated Movies</h1>
        <RatedMoviesList />
      </div>
    </>
  );
};

export default MyList;
