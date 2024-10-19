import { createSlice } from "@reduxjs/toolkit";
import { setItem, getItem, removeItem } from "../../utils/localStorage";

const initialState = {
  user: getItem("user") || null,
  isAuthenticated: !!getItem("user"),
  users: getItem("users") || [], // Store multiple users
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload);
      setItem("users", state.users);
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      setItem("user", action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeItem("user");
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
