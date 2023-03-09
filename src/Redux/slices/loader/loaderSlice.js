import { createSlice } from "@reduxjs/toolkit";

const initialLoaderState = {
  loading: false,
  showToast: false,
  errorMessage: "",
  // toastType: "Primary",
};

const loaderSlice = createSlice({
  name: "loaderSlice",
  initialState: initialLoaderState,
  reducers: {
    startLoader: (state, action) => {
      state.loading = true;
    },
    stopLoader: (state, action) => {
      state.loading = false;
    },
    showToast: (state, actions) => {
      state.showToast = true;
      state.errorMessage = actions.payload;
    },
    hideToast: (state, actions) => {
      state.showToast = false;
      state.errorMessage = "";
    },
  },

  extraReducers: {},
});

export const { startLoader, stopLoader, showToast, hideToast } =
  loaderSlice.actions;

export default loaderSlice.reducer;
