import { combineReducers } from "redux";

import { authSlice } from "./slices/auth/authSlice";
import { boardSlice } from "./slices/board/boardSlice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  board: boardSlice.reducer,
});
