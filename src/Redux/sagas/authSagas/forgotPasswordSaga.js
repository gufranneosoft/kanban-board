// import { useHistory } from "react-router-dom";
import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../../../api";
import endPoints from "../../../../api/endPoints";
import { catchResponseError } from "../../../../utility/CommonHelper";

import {
  forgotPasswordFailed,
  forgotPasswordSuccess,
  forgotPasswordUser,
} from "../../slices/auth/forgotPasswordSlice";
import {
  showToast,
  startLoader,
  stopLoader,
} from "../../slices/loader/loaderSlice";

function* forgotPassword(action) {
  yield put(startLoader());
  try {
    const result = yield call(
      [api, "post"],
      endPoints.forgotPassword,
      action.payload
    );

    if (!result.status) throw result;
    result.data.data = action.payload;
    yield put(forgotPasswordSuccess(result.data));
    yield put(stopLoader());
  } catch (e) {
    yield put(stopLoader());
    yield put(showToast(catchResponseError(e)));

    yield put(forgotPasswordFailed(catchResponseError(e)));
  }
}

export function* forgotPasswordSaga() {
  yield takeLatest(forgotPasswordUser.type, forgotPassword);
}
