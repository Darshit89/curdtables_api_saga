import { all, takeEvery, put } from 'redux-saga/effects';
import actions from './actions';
import { axiosDelete, axiosGet, axiosPost, axiosPut } from '../axiosHelper';
import * as queryString from 'query-string';

/**
 * Request to get user list.
 */
export function* getUserListRequest({ queryParams }) {
  try {
    const { data } = yield axiosGet(`user?${queryParams}`);
    yield put(actions.getUserListSuccess(data));
  } catch (error) {
    yield put(actions.getUserListFailure(error.message, error.data || {}));
  }
}

/**
 * Request to create user.
 */
export function* createUserRequest({ payload }) {
  try {
    const { data } = yield axiosPost(payload, 'user');
    yield put(actions.createUserSuccess(data));
  } catch (error) {
    yield put(actions.createUserFailure(error.message, error.data || {}));
  }
}

/**
 * Request to update user.
 */
export function* updateUserRequest({ payload }) {
  try {
    const { data } = yield axiosPost(payload, 'user');
    yield put(actions.updateUserSuccess(data));
    const queryParams = {
      page: 1
    };
    yield put(actions.getUserList(queryString.stringify(queryParams)));
  } catch (error) {
    yield put(actions.updateUserFailure(error.message, error.data || {}));
  }
}

/**
 * Request to get user by id.
 */
export function* getUserById({ id }) {
  try {
    const { data } = yield axiosGet(`user/${id}`);
    yield put(actions.getUserByIdSuccess(data));
  } catch (error) {
    yield put(actions.getUserByIdFailure(error.message, error.data || {}));
  }
}

/**
 * Request to Delete user.
 */
export function* deleteUserRequest({ id }) {
  try {
    const { data } = yield axiosDelete(`user/${id}`);
    yield put(actions.deleteUserSuccess(data));
    const queryParams = {
      page: 1
    };
    yield put(actions.getUserList(queryString.stringify(queryParams)));
  } catch (error) {
    yield put(actions.deleteUserFailure(error.message, error.data || {}));
  }
}

/**
 * Request to change status.
 */
export function* changeStatusRequest({ payload }) {
  try {
    const { data } = yield axiosPut(payload, 'user/status');
    yield put(actions.changeStatusSuccess(data));
    const queryParams = {
      page: 1
    };
    yield put(actions.getUserList(queryString.stringify(queryParams)));
  } catch (error) {
    yield put(actions.changeStatusFailure(error.message, error.data || {}));
  }
}
/**
 * root saga which will capture the actions.
 */
export default function* rootSaga() {
  yield all([takeEvery(actions.GET_USER_LIST_REQUEST, getUserListRequest)]);
  yield all([takeEvery(actions.CREATE_USER_REQUEST, createUserRequest)]);
  yield all([takeEvery(actions.GET_USER_BY_ID_REQUEST, getUserById)]);
  yield all([takeEvery(actions.UPDATE_USER_REQUEST, updateUserRequest)]);
  yield all([takeEvery(actions.DELETE_USER_REQUEST, deleteUserRequest)]);
  yield all([takeEvery(actions.CHANGE_STATUS_REQUEST, changeStatusRequest)]);
}
