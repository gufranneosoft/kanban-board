import { all, spawn } from "redux-saga/effects";
import { forgotPasswordSaga } from "./authSagas/forgotPasswordSaga";
import { loginSaga } from "./authSagas/loginSaga";
import { resetPasswordSaga } from "./authSagas/resetPasswordSaga";

export function* rootSaga() {
  yield all([
    spawn(loginSaga),
    spawn(forgotPasswordSaga),
    spawn(resetPasswordSaga),
  ]);
}

export default rootSaga;
