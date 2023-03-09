// import { useHistory } from "react-router-dom";
import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../../../api";
import endPoints from "../../../../api/endPoints";
import { catchResponseError } from "../../../../utility/CommonHelper";
import {
  resetPasswordFailed,
  resetPasswordSuccess,
  resetPasswordUser,
} from "../../slices/auth/resetPasswordSlice";

import {
  showToast,
  startLoader,
  stopLoader,
} from "../../slices/loader/loaderSlice";

function* resetPassword(action) {
  yield put(startLoader());
  try {
    const result = yield call(
      [api, "post"],
      endPoints.resetPassword,
      action.payload
    );

    if (!result.status) throw result;
    result.data.data = action.payload;
    yield put(resetPasswordSuccess(result.data));
    yield put(stopLoader());
  } catch (e) {
    yield put(stopLoader());
    yield put(showToast(catchResponseError(e)));

    yield put(resetPasswordFailed(catchResponseError(e)));
  }
}

export function* resetPasswordSaga() {
  yield takeLatest(resetPasswordUser.type, resetPassword);
}
