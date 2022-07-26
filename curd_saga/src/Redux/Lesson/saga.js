import { all, takeEvery, put } from 'redux-saga/effects';
import actions from './actions';
import { axiosGet, axiosPost, axiosDelete, axiosPut } from '../axiosHelper';
import * as queryString from 'query-string';

/**
 * Request to get lesson list.
 */
export function* getLessonListRequest({ queryParams }) {
  try {
    const { data } = yield axiosGet(`lesson?${queryParams}`);
    yield put(actions.getLessonListSuccess(data));
  } catch (error) {
    yield put(actions.getLessonListFailure(error.message, error.data || {}));
  }
}

/**
 * Request to create lesson.
 */
export function* createLessonRequest({ payload }) {
  try {
    const { data } = yield axiosPost(payload, 'lesson');
    yield put(actions.createLessonSuccess(data));
  } catch (error) {
    yield put(actions.createLessonFailure(error.message, error.data || {}));
  }
}

/**
 * Request to update lesson.
 */
 export function* updateLessonRequest({ payload }) {
  try {
    const { data } = yield axiosPut(payload, `lesson`);
    yield put(actions.updateLessonSuccess(data));
    const queryParams = {
      page: 1
    };
    yield put(actions.getLessonList(queryString.stringify(queryParams)));
  } catch (error) {
    yield put(actions.updateLessonFailure(error.message, error.data || {}));
  }
}

/**
 * Request to get lesson by id.
 */
export function* getLessonById({ id }) {
  try {
    const { data } = yield axiosGet(`lesson/${id}`);
    yield put(actions.getLessonByIdSuccess(data));
  } catch (error) {
    yield put(actions.getLessonByIdFailure(error.message, error.data || {}));
  }
}

/**
 * Request to Delete Lesson.
 */
export function* deleteLessonRequest({ id }) {
  try {
    const { data } = yield axiosDelete(`lesson/${id}`);
    yield put(actions.deleteLessonSuccess(data));
    const queryParams = {
      page: 1
    };
    yield put(actions.getLessonList(queryString.stringify(queryParams)));
  } catch (error) {
    yield put(actions.deleteLessonFailure(error.message, error.data || {}));
  }
}

/**
 * Request to change status
 */
export function* changeStatusRequest({ payload }) {
  try {
    const { data } = yield axiosPut(payload, 'lesson/change-status');
    yield put(actions.lessonChangeStatusSuccess(data));
    const queryParams = {
      page: 1
    };
    yield put(actions.getLessonList(queryString.stringify(queryParams)));
  } catch (error) {
    yield put(actions.lessonChangeStatusFailure(error.message, error.data || {}));
  }
}

/**
 * Request to get sub lesson by id.
 */
 export function* getSubLessonById({ id , queryParams}) {
  try {
    const { data } = yield axiosGet(`lesson/sub-lesson/${id}?${queryParams}`);
    yield put(actions.getSubLessonByIdSuccess(data));
  } catch (error) {
    yield put(actions.getSubLessonByIdFailure(error.message, error.data || {}));
  }
}

/**
 * Request to update single video.
 */
 export function* editSingleVideo({ payload }) {
  try {
    const { data } = yield axiosPut(payload, `lesson/sub-lesson`);
    yield put(actions.editSingleVideoSuccess(data));
    const queryParams = {
      page: 1
    };
    yield put(actions.getSubLessonById(data.data.lesson_id, queryString.stringify(queryParams)));
  } catch (error) {
    yield put(actions.editSingleVideoFailure(error.message, error.data || {}));
  }
}

/**
 * Request to Delete single video.
 */
 export function* deleteSingleVideo({ id }) {
  try {
    const { data } = yield axiosDelete(`lesson/sub-lesson/${id}`);
    yield put(actions.deleteSingleVideoSuccess(data));
    const queryParams = {
      page: 1
    };
    yield put(actions.getSubLessonById(data.data.lesson_id, queryString.stringify(queryParams)));
  } catch (error) {
    yield put(actions.deleteSingleVideoFailure(error.message, error.data || {}));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.GET_LESSON_LIST_REQUEST, getLessonListRequest)]);
  yield all([takeEvery(actions.CREATE_LESSON_REQUEST, createLessonRequest)]);
  yield all([takeEvery(actions.GET_LESSON_BY_ID_REQUEST, getLessonById)]);
  yield all([takeEvery(actions.UPDATE_LESSON_REQUEST, updateLessonRequest)]);
  yield all([takeEvery(actions.DELETE_LESSON_REQUEST, deleteLessonRequest)]);
  yield all([takeEvery(actions.LESSON_CHANGE_STATUS_REQUEST, changeStatusRequest)]);
  yield all([takeEvery(actions.GET_SUB_LESSON_BY_ID_REQUEST, getSubLessonById)]);
  yield all([takeEvery(actions.EDIT_SINGLE_VIDEO_REQUEST, editSingleVideo)]);
  yield all([takeEvery(actions.DELETE_SINGLE_VIDEO_REQUEST, deleteSingleVideo)]);
}
