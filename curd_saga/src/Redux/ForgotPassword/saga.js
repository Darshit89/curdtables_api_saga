import { all, takeEvery, put } from "redux-saga/effects";
import actions from "./actions";
import { axiosPost } from '../axiosHelper';

/**
 * Request to forgot-password.
 */
export function* forgotPasswordRequest({ payload }) {
  try {
    const { data } = yield axiosPost(payload, 'auth/forget-password');
    yield put(actions.forgotPasswordSuccess(data));
  } catch (error) {
    yield put(actions.forgotPasswordFailure(error.message, error.data || {}));
  }
}

/**
 * root saga which will capture the actions.
 *
 */
export default function* rootSaga() {
  yield all([
    takeEvery(actions.FORGOT_PASSWORD_REQUEST, forgotPasswordRequest),
  ]);
}
