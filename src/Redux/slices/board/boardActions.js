import * as requestFromServer from "./boardCruds";
import { startLoader, stopLoader } from "../loader/loaderSlice";
import { boardSlice } from "./boardSlice";
import { toast } from "react-toastify";

const { actions } = boardSlice;

export const fetchBoard = (obj) => (dispatch) => {
  dispatch(actions.startCall());
  dispatch(startLoader());
  return requestFromServer
    .fetchBoard(obj)
    .then((response) => {
      const { bds } = response.data;
      dispatch(actions.fetchBoard(bds));
      dispatch(stopLoader());
    })
    .catch((error) => {
      toast.error(error.response.request.statusText || "Something went wrong!");
    });
};

export const updateBoard = (payload) => (dispatch) => {
  dispatch(actions.startCall());
  dispatch(startLoader());
  return requestFromServer
    .updateBoard(payload)
    .then((response) => {
      const { bds } = response.data;
      dispatch(actions.updateBoard(bds));
      dispatch(stopLoader());
    })
    .catch((error) => {
      toast.error(error.response.request.statusText || "Something went wrong!");
    });
};

export const resetStoreData = (obj) => (dispatch) => {
  dispatch(actions.resetStoreData(obj));
};
