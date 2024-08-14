"use client";

import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface RatingFormProps {
  movieId: number;
}

const RatingForm: React.FC<RatingFormProps> = ({ movieId }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const { guestSessionId, isLoggedIn } = useSelector(
    (state: RootState) => state.guestSession,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating && guestSessionId && isLoggedIn) {
      try {
        const response = await axios.post(
          `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}`,
          { value: rating },
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PERSONAL}`,
            },
          },
        );

        setMessage("Your rating has been submitted!");
        console.log(response);
      } catch (error) {
        console.error("Error submitting rating:", error);
        setMessage("Failed to submit rating. Please try again.");
      }
    } else if (!guestSessionId) {
      setMessage("Please log in as a guest first.");
    } else {
      setMessage("Please select a rating.");
    }
  };

  return (
    <div className="rating-form">
      <h3>Rate this movie</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rating">Rating:</label>
        <select
          id="rating"
          value={rating ?? ""}
          onChange={(e) => setRating(Number(e.target.value))}
          className="rounded border border-gray-300 p-2 text-black"
        >
          <option value="" disabled>
            Select rating
          </option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="ml-2 rounded bg-blue-500 p-2 text-white"
        >
          Submit
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RatingForm;
