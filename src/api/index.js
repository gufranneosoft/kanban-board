import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// api.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("tncc_admin_user")
//       ? JSON.parse(localStorage.getItem("tncc_admin_user")).access_token
//       : sessionStorage.getItem("tncc_admin_user")
//       ? JSON.parse(sessionStorage.getItem("tncc_admin_user")).access_token
//       : null;

//     if (accessToken) {
//       if (
//         config.url.includes("access-token") ||
//         config.url.includes("login") ||
//         config.url.includes("forgot-password")
//       ) {
//         config.headers["client_secret"] = process.env.REACT_APP_CLIENT_SECRET;
//       } else {
//         config.headers["client_secret"] = process.env.REACT_APP_CLIENT_SECRET;
//         config.headers["authorization"] = accessToken;
//       }
//     } else {
//       config.headers["client_secret"] = process.env.REACT_APP_CLIENT_SECRET;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(null, (error) => {
//   if (error.request.status === 0) {
//     return Promise.reject(error);
//   }
//   // if (error.request.status === 401) {
//   //   store.dispatch(logoutUser());
//   //   localStorage.clear();
//   //   window.location.reload();
//   //   return;
//   // }

//   const refreshToken = localStorage.getItem("tncc_admin_user")
//     ? JSON.parse(localStorage.getItem("tncc_admin_user")).refresh_token
//     : sessionStorage.getItem("tncc_admin_user")
//     ? JSON.parse(sessionStorage.getItem("tncc_admin_user")).refresh_token
//     : null;
//   if (refreshToken && error.response.status === 403) {
//     alert("integrate api first");
//     // return api
//     //   .get(`/api/v1/auth/get-token?refresh_token=${refreshToken.refresh_token}`)
//     //   .then((result) => {
//     //     return result.data?.result?.token;
//     //   })
//     //   .then((newToken) => {
//     //     return {
//     //       ...refreshToken,
//     //       token: newToken,
//     //     };
//     //   })
//     //   .then((dataToSaveOnLocalStorage) => {
//     //     console.log("new token", dataToSaveOnLocalStorage);
//     //     localStorage.setItem(
//     //       "authTokens",
//     //       JSON.stringify(dataToSaveOnLocalStorage)
//     //     );
//     //     return api.request(error.config);
//     //   })
//     //   .catch((err) => {
//     //     console.log("hello i am erreor", err);
//     //     store.dispatch(logoutUser());
//     //     localStorage.clear();
//     //   });
//   }

//   return Promise.reject(error);
// });

export default api;
