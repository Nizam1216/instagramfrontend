import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserDetails } = profileSlice.actions;
export default profileSlice.reducer;
