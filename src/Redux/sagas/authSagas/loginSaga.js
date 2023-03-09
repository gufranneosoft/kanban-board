import { call, put, takeLatest } from "redux-saga/effects";

import api from "../../../../api";
import endPoints from "../../../../api/endPoints";
import { catchResponseError } from "../../../../utility/CommonHelper";

import { loginFailed, loginUser, setToken } from "../../slices/auth/loginSlice";
import {
  showToast,
  startLoader,
  stopLoader,
} from "../../slices/loader/loaderSlice";

function* loginHandler(action) {
  yield put(startLoader());
  try {
    const result = yield call([api, "post"], endPoints.login, action.payload);

    if (!result.status) throw result;
    if (result.data.data.accessToken) {
      if (true) {
        localStorage.setItem(
          "tncc_admin_user",
          JSON.stringify({
            access_token: result.data.data.accessToken,
            refresh_token: result.data.data.refreshToken,
            user_id: result.data.data.userId,
            email_id: result.data.data.emaiId,
          })
        );
      } else {
        sessionStorage.setItem(
          "tncc_admin_user",
          JSON.stringify({
            access_token: result.data.data.accessToken,
            refresh_token: result.data.data.refreshToken,
            user_id: result.data.data.userId,
            email_id: result.data.data.emaiId,
          })
        );
      }

      yield put(setToken(result.data));
      yield put(stopLoader());
    }
  } catch (e) {
    yield put(stopLoader());
    yield put(showToast(catchResponseError(e)));
    yield put(loginFailed(catchResponseError(e)));
  }
}

export function* loginSaga() {
  yield takeLatest(loginUser.type, loginHandler);
}

// const res = {
//   data: {
//     success: true,
//     data: {
//       userId: 1,
//       emaiId: "admin@yopmail.com",
//       roleId: 1,
//       firstName: "Peter",
//       lastName: "Giza",
//       studentId: 1,
//       permission: [
//         {
//           moduleId: 1,
//           moduleName: "Student List",
//           permissions: [
//             {
//               permissionId: 1,
//               permissionName: "Read",
//             },
//             {
//               permissionId: 2,
//               permissionName: "Write",
//             },
//             {
//               permissionId: 3,
//               permissionName: "Delete",
//             },
//             {
//               permissionId: 4,
//               permissionName: "View",
//             },
//             {
//               permissionId: 5,
//               permissionName: "Report",
//             },
//           ],
//         },
//         {
//           moduleId: 2,
//           moduleName: "Course",
//           permissions: [
//             {
//               permissionId: 1,
//               permissionName: "Read",
//             },
//             {
//               permissionId: 2,
//               permissionName: "Write",
//             },
//             {
//               permissionId: 3,
//               permissionName: "Delete",
//             },
//             {
//               permissionId: 4,
//               permissionName: "View",
//             },
//             {
//               permissionId: 5,
//               permissionName: "Report",
//             },
//           ],
//         },
//         {
//           moduleId: 3,
//           moduleName: "Collective",
//           permissions: [
//             {
//               permissionId: 1,
//               permissionName: "Read",
//             },
//             {
//               permissionId: 2,
//               permissionName: "Write",
//             },
//             {
//               permissionId: 3,
//               permissionName: "Delete",
//             },
//             {
//               permissionId: 4,
//               permissionName: "View",
//             },
//             {
//               permissionId: 5,
//               permissionName: "Report",
//             },
//           ],
//         },
//         {
//           moduleId: 4,
//           moduleName: "Co-Hort",
//           permissions: [
//             {
//               permissionId: 1,
//               permissionName: "Read",
//             },
//             {
//               permissionId: 2,
//               permissionName: "Write",
//             },
//             {
//               permissionId: 3,
//               permissionName: "Delete",
//             },
//             {
//               permissionId: 4,
//               permissionName: "View",
//             },
//             {
//               permissionId: 5,
//               permissionName: "Report",
//             },
//           ],
//         },
//         {
//           moduleId: 5,
//           moduleName: "Live Session",
//           permissions: [
//             {
//               permissionId: 1,
//               permissionName: "Read",
//             },
//             {
//               permissionId: 2,
//               permissionName: "Write",
//             },
//             {
//               permissionId: 3,
//               permissionName: "Delete",
//             },
//             {
//               permissionId: 4,
//               permissionName: "View",
//             },
//             {
//               permissionId: 5,
//               permissionName: "Report",
//             },
//           ],
//         },
//         {
//           moduleId: 6,
//           moduleName: "Support Hours",
//           permissions: [
//             {
//               permissionId: 1,
//               permissionName: "Read",
//             },
//             {
//               permissionId: 2,
//               permissionName: "Write",
//             },
//             {
//               permissionId: 3,
//               permissionName: "Delete",
//             },
//             {
//               permissionId: 4,
//               permissionName: "View",
//             },
//             {
//               permissionId: 5,
//               permissionName: "Report",
//             },
//             {
//               permissionId: 1,
//               permissionName: "Read",
//             },
//             {
//               permissionId: 2,
//               permissionName: "Write",
//             },
//             {
//               permissionId: 3,
//               permissionName: "Delete",
//             },
//             {
//               permissionId: 4,
//               permissionName: "View",
//             },
//             {
//               permissionId: 5,
//               permissionName: "Report",
//             },
//           ],
//         },
//         {
//           moduleId: 7,
//           moduleName: "User",
//           permissions: [
//             {
//               permissionId: 1,
//               permissionName: "Read",
//             },
//             {
//               permissionId: 2,
//               permissionName: "Write",
//             },
//             {
//               permissionId: 3,
//               permissionName: "Delete",
//             },
//             {
//               permissionId: 4,
//               permissionName: "View",
//             },
//             {
//               permissionId: 5,
//               permissionName: "Report",
//             },
//           ],
//         },
//         {
//           moduleId: 8,
//           moduleName: "Peer Group",
//           permissions: [
//             {
//               permissionId: 1,
//               permissionName: "Read",
//             },
//             {
//               permissionId: 2,
//               permissionName: "Write",
//             },
//             {
//               permissionId: 3,
//               permissionName: "Delete",
//             },
//             {
//               permissionId: 4,
//               permissionName: "View",
//             },
//             {
//               permissionId: 5,
//               permissionName: "Report",
//             },
//           ],
//         },
//         {
//           moduleId: 9,
//           moduleName: "Manage Forum",
//           permissions: [
//             {
//               permissionId: 1,
//               permissionName: "Read",
//             },
//             {
//               permissionId: 2,
//               permissionName: "Write",
//             },
//             {
//               permissionId: 3,
//               permissionName: "Delete",
//             },
//             {
//               permissionId: 4,
//               permissionName: "View",
//             },
//             {
//               permissionId: 5,
//               permissionName: "Report",
//             },
//           ],
//         },
//         {
//           moduleId: 10,
//           moduleName: "Report",
//           permissions: [
//             {
//               permissionId: 1,
//               permissionName: "Read",
//             },
//             {
//               permissionId: 2,
//               permissionName: "Write",
//             },
//             {
//               permissionId: 3,
//               permissionName: "Delete",
//             },
//             {
//               permissionId: 4,
//               permissionName: "View",
//             },
//             {
//               permissionId: 5,
//               permissionName: "Report",
//             },
//           ],
//         },
//         {
//           moduleId: 11,
//           moduleName: "Payment Transction",
//           permissions: [
//             {
//               permissionId: 1,
//               permissionName: "Read",
//             },
//             {
//               permissionId: 2,
//               permissionName: "Write",
//             },
//             {
//               permissionId: 3,
//               permissionName: "Delete",
//             },
//             {
//               permissionId: 4,
//               permissionName: "View",
//             },
//             {
//               permissionId: 5,
//               permissionName: "Report",
//             },
//           ],
//         },
//         {
//           moduleId: 12,
//           moduleName: "Chat",
//           permissions: [
//             {
//               permissionId: 1,
//               permissionName: "Read",
//             },
//             {
//               permissionId: 2,
//               permissionName: "Write",
//             },
//             {
//               permissionId: 3,
//               permissionName: "Delete",
//             },
//             {
//               permissionId: 4,
//               permissionName: "View",
//             },
//             {
//               permissionId: 5,
//               permissionName: "Report",
//             },
//           ],
//         },
//       ],
//       accessToken:
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGVJZCI6MSwiZmlyc3ROYW1lIjoiUGV0ZXIiLCJsYXN0TmFtZSI6IkdpemEiLCJpYXQiOjE2Njc4ODkwODIsImV4cCI6MTY3MDQ4MTA4Mn0.fcNdifXqXqMhHgQ-oBCXh63oSR8lDucjhLvjJmw4ZRc",
//       refreshToken:
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGVJZCI6MSwiZmlyc3ROYW1lIjoiUGV0ZXIiLCJsYXN0TmFtZSI6IkdpemEiLCJpYXQiOjE2Njc4ODkwODIsImV4cCI6MTY3MDQ4MTA4Mn0.gA-ihbV4CktOo-CIVJ5lS2ZrrJqLCBoTr3kG0Ol1C3o",
//     },
//     message: "Record fetch",
//   },
//   status: 200,
//   statusText: "",
//   headers: {
//     "content-length": "4160",
//     "content-type": "application/json; charset=utf-8",
//   },
//   config: {
//     transitional: {
//       silentJSONParsing: true,
//       forcedJSONParsing: true,
//       clarifyTimeoutError: false,
//     },
//     transformRequest: [null],
//     transformResponse: [null],
//     timeout: 0,
//     xsrfCookieName: "XSRF-TOKEN",
//     xsrfHeaderName: "X-XSRF-TOKEN",
//     maxContentLength: -1,
//     maxBodyLength: -1,
//     env: {
//       FormData: null,
//     },
//     headers: {
//       Accept: "application/json, text/plain, */*",
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       client_secret:
//         "O6tkqeExC5df9cLSQXFML3sC66G2HWbnftLs7JA6z7n4ziFOvR3I88UC2y1VF25g8ctvIY55gL01BHut8pF0grdr4YvZloNaPILOLgKi66V65BnbtM09a2ufgy5d1KcS",
//     },
//     baseURL: "https://9jdlrufq14.execute-api.us-east-1.amazonaws.com/dev",
//     method: "post",
//     url: "/auth/api/v1/sign-in",
//     data:
//       '{"emailId":"admin@yopmail.com","password":"admin@123","deviceType":"WEB","deviceToken":"cTDIslDO7kJ4","roleId":1}',
//   },
//   request: {},
// };
