import { configureStore } from "@reduxjs/toolkit";
import profilePicReducer from "./profilePicSlice";

export const store = configureStore({
  reducer: {
    profile: profilePicReducer,
  },
});
