import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GuestSessionState {
  guestSessionId: string | null;
  isLoggedIn: boolean;
}

const initialState: GuestSessionState = {
  guestSessionId: null,
  isLoggedIn: false,
};

const guestSessionSlice = createSlice({
  name: "guestSession",
  initialState,
  reducers: {
    setGuestSessionId(state, action: PayloadAction<string>) {
      state.guestSessionId = action.payload;
      state.isLoggedIn = true;
    },
    clearGuestSession(state) {
      state.guestSessionId = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setGuestSessionId, clearGuestSession } =
  guestSessionSlice.actions;

export default guestSessionSlice.reducer;
