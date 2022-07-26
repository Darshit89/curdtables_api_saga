import { all, takeEvery, put } from "redux-saga/effects";
import { push } from "connected-react-router";
import actions from "./actions";
import { axiosPost } from '../axiosHelper';

/**
 * Request to reset-password.
 */
export function* resetPasswordRequest({ payload , token}) {
  try {
    const { data } = yield axiosPost(payload, 'auth/reset-password/' + token);
    yield put(actions.resetPasswordSuccess(data));
    yield put(push("/"));
  } catch (error) {
    yield put(actions.resetPasswordFailure(error.message, error.data || {}));
  }
}

/**
 * root saga which will capture the actions.
 *
 */
export default function* rootSaga() {
  yield all([
    takeEvery(actions.RESET_PASSWORD_REQUEST, resetPasswordRequest),
  ]);
}
