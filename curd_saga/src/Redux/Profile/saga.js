import { all, takeEvery, put } from 'redux-saga/effects';
import actions from './actions';
import authActions from '../Auth/actions';
import { axiosPut } from '../axiosHelper';

/**
 * Request to change-password.
 */
export function* profileRequest({ payload }) {
  try {
    const { data } = yield axiosPut(payload, 'auth/edit-profile');
    yield put(actions.profileSuccess(data));
    yield put(authActions.updateEmail(data));
    let { ...userData } = data.data;
    yield localStorage.setItem('user', JSON.stringify(userData));
  } catch (error) {
    yield put(actions.profileFailure(error.message, error.data || {}));
  }
}

/**
 * root saga which will capture the actions.
 *
 */
export default function* rootSaga() {
  yield all([takeEvery(actions.PROFILE_REQUEST, profileRequest)]);
}
