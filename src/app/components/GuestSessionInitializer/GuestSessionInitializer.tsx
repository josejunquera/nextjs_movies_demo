"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../redux/store";
import { setGuestSessionId } from "../../redux/guestSessionSlice";

const GuestSessionInitializer = () => {
  const dispatch = useDispatch();
  const { guestSessionId, isLoggedIn } = useSelector(
    (state: RootState) => state.guestSession,
  );

  useEffect(() => {
    if (guestSessionId && isLoggedIn) {
      console.log(
        "Guest session already exists and is logged in:",
        guestSessionId,
      );
      return;
    }

    const initializeGuestSession = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/authentication/guest_session/new`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PERSONAL}`,
            },
          },
        );

        const newGuestSessionId = response.data.guest_session_id;
        dispatch(setGuestSessionId(newGuestSessionId));
        console.log("Guest session initialized:", newGuestSessionId);
      } catch (error) {
        console.error("Error creating guest session:", error);
      }
    };

    initializeGuestSession();
  }, [dispatch, guestSessionId, isLoggedIn]);

  return null;
};

export default GuestSessionInitializer;
