
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance.js";

// 1. REGISTER
export const registerUser = createAsyncThunk( 
    "/auth/register",
    async( userData, {rejectWithValue}) =>{
        try{
            const response = await axiosInstance.post('/auth/register',userData)
            return response.data
        }
        catch(error){
             return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
        }
    }
)

// 2. LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/auth/login",
        credentials
      );


      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// 3. LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/logout");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

// 4. GET PROFILE
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/get-me");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch profile"
      );
    }
  }
);
