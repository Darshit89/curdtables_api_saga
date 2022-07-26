import { all, takeEvery, put } from "redux-saga/effects";
import actions from "./actions";
import { axiosPost } from '../axiosHelper';

/**
 * Request to change-password.
 */
export function* changePasswordRequest({ payload }) {
  try {
    const { data } = yield axiosPost(payload, "auth/change-password");
    yield put(actions.changePasswordSuccess(data));
  } catch (error) {
    yield put(actions.changePasswordFailure(error.message, error.data || {}));
  }
}

/**
 * root saga which will capture the actions.
 *
 */
export default function* rootSaga() {
  yield all([
    takeEvery(actions.CHANGE_PASSWORD_REQUEST, changePasswordRequest),
  ]);
}
