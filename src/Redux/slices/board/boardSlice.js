import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
};

export const boardSlice = createSlice({
  name: "board",
  initialState: initialState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
    },
    startCall: (state, action) => {
      state.error = null;
      state.loading = true;
    },

    fetchBoard: (state, action) => {
      state.boards = action.payload;
    },

    updateBoard: (state, action) => {
      state.boards = action.payload;
    },
  },
});
