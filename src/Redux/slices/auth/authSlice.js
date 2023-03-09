import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      state.errorMessage = action.payload.error.clientMessage;
    },
    startCall: (state, action) => {
      state.error = null;
    },

    // register user
    registerUser: (state, action) => {
      state.actionsLoading = false;
    },

    // login user
    loginUser: (state, action) => {
      state.user = action.payload;
    },

    // logout user
    logutUser: (state, action) => {
      state.user = null;
    },

    resetUser: (state, action) => {
      return initialState;
    },
  },
});
