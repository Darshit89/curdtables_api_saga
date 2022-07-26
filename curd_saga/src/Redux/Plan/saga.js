import { all, takeEvery, put } from 'redux-saga/effects';
import actions from './actions';
import { axiosGet, axiosPost, axiosDelete, axiosPut } from '../axiosHelper';
import * as queryString from 'query-string';

/**
 * Request to get plan list.
 */
export function* getPlanListRequest({ queryParams }) {
  try {
    const { data } = yield axiosGet(`plan?${queryParams}`);
    yield put(actions.getPlanListSuccess(data));
  } catch (error) {
    yield put(actions.getPlanListFailure(error.message, error.data || {}));
  }
}

/**
 * Request to create Plan.
 */
export function* createPlanRequest({ payload }) {
  try {
    const { data } = yield axiosPost(payload, 'plan');
    yield put(actions.createPlanSuccess(data));
  } catch (error) {
    yield put(actions.createPlanFailure(error.message, error.data || {}));
  }
}

/**
 * Request to update Plan.
 */
 export function* updatePlanRequest({ payload}) {
  try {
    const { data } = yield axiosPost(payload, `plan`);
    yield put(actions.updatePlanSuccess(data));
    const queryParams = {
      page: 1
    };
    yield put(actions.getPlanList(queryString.stringify(queryParams)));
  } catch (error) {
    yield put(actions.updatePlanFailure(error.message, error.data || {}));
  }
}

/**
 * Request to get plan by id.
 */
export function* getPlanById({ id }) {
  try {
    const { data } = yield axiosGet(`plan/${id}`);
    yield put(actions.getPlanByIdSuccess(data));
  } catch (error) {
    yield put(actions.getPlanByIdFailure(error.message, error.data || {}));
  }
}

/**
 * Request to Delete Plan.
 */
export function* deletePlanRequest({ id }) {
  try {
    const { data } = yield axiosDelete(`plan/${id}`);
    yield put(actions.deletePlanSuccess(data));
    const queryParams = {
      page: 1
    };
    yield put(actions.getPlanList(queryString.stringify(queryParams)));
  } catch (error) {
    yield put(actions.deletePlanFailure(error.message, error.data || {}));
  }
}

/**
 * Request to change status
 */
export function* changeStatusRequest({ payload }) {
  try {
    const { data } = yield axiosPut(payload, 'plan/change-status');
    yield put(actions.planChangeStatusSuccess(data));
    const queryParams = {
      page: 1
    };
    yield put(actions.getPlanList(queryString.stringify(queryParams)));
  } catch (error) {
    yield put(actions.planChangeStatusFailure(error.message, error.data || {}));
  }
}

/**
 * Request to get plan duration list.
 */
 export function* getPlanDurationList() {
  try {
    const { data } = yield axiosGet(`/plan/plan-type`);
    yield put(actions.getPlanDurationListSuccess(data.data));
  } catch (error) {
    yield put(actions.getPlanDurationListFailure(error.message, error.data || {}));
  }
}

export function* getUserSubscriptionList({ queryParams }) {
  try {
    const { data } = yield axiosGet(`subscription/list?${queryParams}`);
    yield put(actions.getUserSubscriptionListSuccess(data.data));
  } catch (error) {
    yield put(actions.getUserSubscriptionListFailure(error.message, error.data || {}));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.GET_PLAN_LIST_REQUEST, getPlanListRequest)]);
  yield all([takeEvery(actions.CREATE_PLAN_REQUEST, createPlanRequest)]);
  yield all([takeEvery(actions.GET_PLAN_BY_ID_REQUEST, getPlanById)]);
  yield all([takeEvery(actions.UPDATE_PLAN_REQUEST, updatePlanRequest)]);
  yield all([takeEvery(actions.DELETE_PLAN_REQUEST, deletePlanRequest)]);
  yield all([takeEvery(actions.PLAN_CHANGE_STATUS_REQUEST, changeStatusRequest)]);
  yield all([takeEvery(actions.GET_PLAN_DURATION_LIST_REQUEST, getPlanDurationList)]);
  yield all([takeEvery(actions.GET_USER_SUBSCRIPTION_LIST_REQUEST, getUserSubscriptionList)]);
}
