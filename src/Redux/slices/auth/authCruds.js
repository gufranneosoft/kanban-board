import api from "../../../api";

export const REGISTER_NEW_USER = "/users";
export const LOGIN_USER = "/users";
export const GET_GOOGLE_PROFILE =
  "https://www.googleapis.com/oauth2/v1/userinfo";

export function registerUser(payload) {
  return api.post(`${REGISTER_NEW_USER}`, payload);
}
export function loginUser({ userId }) {
  return api.get(`${LOGIN_USER}/?id=${userId}`);
}
export function loginWithGoogle({ access_token }) {
  return api.get(`${GET_GOOGLE_PROFILE}/access_token=${access_token}`);
}
