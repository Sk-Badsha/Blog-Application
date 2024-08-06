import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.status = true), (state.userData = action.payload.userData);
      //   console.log("in authslice state: ", state);
      //console.log("in authslice action: ", action);
    },
    logout: (state) => {
      (state.status = false), (state.userData = null);
    },
  },
});
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
