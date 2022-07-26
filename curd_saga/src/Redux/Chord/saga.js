import { all, takeEvery, put } from 'redux-saga/effects';
import actions from './actions';
import { axiosGet, axiosPost, axiosDelete, axiosPut } from '../axiosHelper';
import * as queryString from 'query-string';

/**
 * Request to get chord list.
 */
export function* getChordListRequest({ queryParams }) {
  try {
    const { data } = yield axiosGet(`chord?${queryParams}`);
    yield put(actions.getChordListSuccess(data));
  } catch (error) {
    yield put(actions.getChordListFailure(error.message, error.data || {}));
  }
}

/**
 * Request to create Chord.
 */
export function* createChordRequest({ payload }) {
  try {
    const { data } = yield axiosPost(payload, 'chord/create');
    yield put(actions.createChordSuccess(data));
  } catch (error) {
    yield put(actions.createChordFailure(error.message, error.data || {}));
  }
}

/**
 * Request to update Chord.
 */
 export function* updateChordRequest({ payload, id }) {
  try {
    const { data } = yield axiosPut(payload, `chord/update/${id}`);
    yield put(actions.updateChordSuccess(data));
    const queryParams = {
      page: 1
    };
    yield put(actions.getChordList(queryString.stringify(queryParams)));
  } catch (error) {
    yield put(actions.updateChordFailure(error.message, error.data || {}));
  }
}

/**
 * Request to get chord by id.
 */
export function* getChordById({ id }) {
  try {
    const { data } = yield axiosGet(`chord/${id}`);
    yield put(actions.getChordByIdSuccess(data));
  } catch (error) {
    yield put(actions.getChordByIdFailure(error.message, error.data || {}));
  }
}

/**
 * Request to Delete Chords.
 */
export function* deleteChordRequest({ id }) {
  try {
    const { data } = yield axiosDelete(`chord/delete/${id}`);
    yield put(actions.deleteChordSuccess(data));
    const queryParams = {
      page: 1
    };
    yield put(actions.getChordList(queryString.stringify(queryParams)));
  } catch (error) {
    yield put(actions.deleteChordFailure(error.message, error.data || {}));
  }
}

/**
 * Request to change status
 */
export function* changeStatusRequest({ payload }) {
  try {
    const { data } = yield axiosPut(payload, 'chord/change-status');
    yield put(actions.chordChangeStatusSuccess(data));
    const queryParams = {
      page: 1
    };
    yield put(actions.getChordList(queryString.stringify(queryParams)));
  } catch (error) {
    yield put(actions.chordChangeStatusFailure(error.message, error.data || {}));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.GET_CHORD_LIST_REQUEST, getChordListRequest)]);
  yield all([takeEvery(actions.CREATE_CHORD_REQUEST, createChordRequest)]);
  yield all([takeEvery(actions.GET_CHORD_BY_ID_REQUEST, getChordById)]);
  yield all([takeEvery(actions.UPDATE_CHORD_REQUEST, updateChordRequest)]);
  yield all([takeEvery(actions.DELETE_CHORD_REQUEST, deleteChordRequest)]);
  yield all([takeEvery(actions.CHORD_CHANGE_STATUS_REQUEST, changeStatusRequest)]);
}
