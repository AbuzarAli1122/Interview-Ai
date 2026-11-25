
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/services/authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
