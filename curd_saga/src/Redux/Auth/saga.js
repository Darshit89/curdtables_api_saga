import { all, takeEvery, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { getToken, clearToken } from '../../Helpers/utility';
import actions from './actions';
import { axiosPost } from '../axiosHelper';

/**
 * Request to login.
 */
export function* loginRequest({ payload }) {
  try {
    const { data } = yield axiosPost(payload, 'auth/login');
    let { token, ...userData } = data.data;
    if (token) {
      yield localStorage.setItem('auth_token', token);
      yield localStorage.setItem('user', JSON.stringify(userData));
      yield put(actions.loginSuccess(userData, token));
      yield put(push('/user'));
    } else {
      throw new Error('Invalid credentials provided.');
    }
  } catch (error) {
    yield put(actions.loginFailure(error.message, error.data || {}));
  }
}

/**
 * Call to log user out.
 *
 */
export function* logout() {
  try {
    clearToken();
    yield put(actions.logoutSuccess());
  } catch (error) {
    yield put(actions.logoutError());
  }
}

/**
 * check if authenticated user access.
 *
 */
export function* checkAuthorization() {
  const token = getToken().get('authToken');
  const user = getToken().get('user');
  if (token && user) {
    yield put(actions.loginSuccess(user, token));
  } else {
    clearToken();
    yield put(push('/'));
  }
}

/**
 * root saga which will capture the actions.
 *
 */
export default function* rootSaga() {
  yield all([
    takeEvery(actions.CHECK_AUTHORIZATION, checkAuthorization),
    takeEvery(actions.LOGIN_REQUEST, loginRequest),
    takeEvery(actions.LOGOUT_REQUEST, logout)
  ]);
}
