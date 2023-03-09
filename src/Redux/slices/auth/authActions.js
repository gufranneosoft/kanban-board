import * as requestFromServer from "./authCruds";
import { authSlice } from "./authSlice";

import { startLoader, stopLoader } from "../loader/loaderSlice";
import { toast } from "react-toastify";

const { actions } = authSlice;

export const registerUser = (payload) => (dispatch) => {
  dispatch(startLoader());
  return requestFromServer
    .registerUser(payload)
    .then((response) => {
      const { data } = response;
      if (data && Object.keys(data).length > 0) {
        toast.success("Registered successfully!");
        dispatch(
          actions.loginUser({
            name: data.name,
            email: data.emailId,
            profileImage: data.profileImage,
            username: data.userName,
          })
        );
        return {
          success: true,
        };
      } else {
        toast.error("Failed to register!");
      }
      dispatch(stopLoader());
    })
    .catch((error) => {
      if (error.response.status === 500) {
        toast.error("Username not available!");
      } else {
        toast.error(
          error.response.request.statusText || "Something went wrong!"
        );
      }
    });
};

export const loginUser = (payload) => (dispatch) => {
  dispatch(startLoader());
  return requestFromServer
    .loginUser(payload)
    .then((response) => {
      const { data } = response;
      if (data && data.length > 0) {
        const user = data[0];
        if (user.password === payload.password) {
          toast.success("Login successfully!");
          dispatch(
            actions.loginUser({
              name: user.name,
              email: user.emailId,
              profileImage: user.profileImage,
              username: user.userName,
            })
          );
          return {
            success: true,
          };
        } else {
          toast.error("Invalid credentails!");
        }
      } else {
        toast.error("User not found!");
      }
      dispatch(stopLoader());
    })
    .catch((error) => {
      toast.error(error.response.request.statusText || "Something went wrong!");
    });
};

export const loginWithGoogle = (payload) => (dispatch) => {
  dispatch(startLoader());
  return requestFromServer
    .loginUser({ userId: payload.id })
    .then((response) => {
      const { data } = response;
      if (data && data.length > 0) {
        const user = data[0];
        toast.success("Login successfully!");
        dispatch(
          actions.loginUser({
            name: user.name,
            email: user.emailId,
            profileImage: user.profileImage,
            username: user.userName,
          })
        );
        return {
          success: true,
        };
      } else {
        return {
          success: false,
        };
      }
      dispatch(stopLoader());
    })
    .catch((error) => {
      // toast.error(error.response.request.statusText || "Something went wrong!");
    });
};

export const logutUser = () => (dispatch) => {
  return dispatch(actions.logutUser());
};

export const resetUser = () => (dispatch) => {
  return () => {
    dispatch(actions.resetUser());
    return "success";
  };
};
