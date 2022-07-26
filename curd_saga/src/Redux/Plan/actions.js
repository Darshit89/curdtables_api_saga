const actions = {
  GET_PLAN_LIST_REQUEST: 'GET_PLAN_LIST_REQUEST',
  GET_PLAN_LIST_SUCCESS: 'GET_PLAN_LIST_SUCCESS',
  GET_PLAN_LIST_ERROR: 'GET_PLAN_LIST_ERROR',

  CREATE_PLAN_REQUEST: 'CREATE_PLAN_REQUEST',
  CREATE_PLAN_SUCCESS: 'CREATE_PLAN_SUCCESS',
  CREATE_PLAN_ERROR: 'CREATE_PLAN_ERROR',

  GET_PLAN_BY_ID_REQUEST: 'GET_PLAN_BY_ID_REQUEST',
  GET_PLAN_BY_ID_SUCCESS: 'GET_PLAN_BY_ID_SUCCESS',
  GET_PLAN_BY_ID_ERROR: 'GET_PLAN_BY_ID_ERROR',

  UPDATE_PLAN_REQUEST: 'UPDATE_PLAN_REQUEST',
  UPDATE_PLAN_SUCCESS: 'UPDATE_PLAN_SUCCESS',
  UPDATE_PLAN_ERROR: 'UPDATE_PLAN_ERROR',

  DELETE_PLAN_REQUEST: 'DELETE_PLAN_REQUEST',
  DELETE_PLAN_SUCCESS: 'DELETE_PLAN_SUCCESS',
  DELETE_PLAN_ERROR: 'DELETE_PLAN_ERROR',

  PLAN_CHANGE_STATUS_REQUEST: 'PLAN_CHANGE_STATUS_REQUEST',
  PLAN_CHANGE_STATUS_SUCCESS: 'PLAN_CHANGE_STATUS_SUCCESS',
  PLAN_CHANGE_STATUS_ERROR: 'PLAN_CHANGE_STATUS_ERROR',

  MODAL_ACTION: 'MODAL_ACTION',

  GET_PLAN_DURATION_LIST_REQUEST: 'GET_PLAN_DURATION_LIST_REQUEST',
  GET_PLAN_DURATION_LIST_SUCCESS: 'GET_PLAN_DURATION_LIST_SUCCESS',
  GET_PLAN_DURATION_LIST_ERROR: 'GET_PLAN_DURATION_LIST_ERROR',

  GET_USER_SUBSCRIPTION_LIST_REQUEST: 'GET_USER_SUBSCRIPTION_LIST_REQUEST',
  GET_USER_SUBSCRIPTION_LIST_SUCCESS: 'GET_USER_SUBSCRIPTION_LIST_SUCCESS',
  GET_USER_SUBSCRIPTION_LIST_ERROR: 'GET_USER_SUBSCRIPTION_LIST_ERROR',
  /**
   * request to get plan list.
   */
  getPlanList: (queryParams) => ({
    type: actions.GET_PLAN_LIST_REQUEST,
    queryParams
  }),

  /**
   * when plan list is successfull.
   */
  getPlanListSuccess: (payload = {}) => ({
    type: actions.GET_PLAN_LIST_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with plan list.
   */
  getPlanListFailure: (payload = '', errors = {}) => ({
    type: actions.GET_PLAN_LIST_ERROR,
    payload,
    errors
  }),

  /**
   * request to create plan.
   */
  createPlan: (payload = {}) => ({
    type: actions.CREATE_PLAN_REQUEST,
    payload
  }),

  /**
   * when create plan is successfull.
   */
  createPlanSuccess: (payload = {}) => ({
    type: actions.CREATE_PLAN_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with create plan.
   */

  createPlanFailure: (payload = '', errors = {}) => ({
    type: actions.CREATE_PLAN_ERROR,
    payload,
    errors
  }),

  /**
   * request to plan by id.
   */
  getPlanById: (id) => ({
    type: actions.GET_PLAN_BY_ID_REQUEST,
    id
  }),

  /**
   * when plan by id is successfull.
   */
  getPlanByIdSuccess: (payload = {}) => ({
    type: actions.GET_PLAN_BY_ID_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with get plan by id.
   */

  getPlanByIdFailure: (payload = '', errors = {}) => ({
    type: actions.GET_PLAN_BY_ID_ERROR,
    payload,
    errors
  }),

  /**
   * request to update plan.
   */
  updatePlan: (payload = {}) => ({
    type: actions.UPDATE_PLAN_REQUEST,
    payload
  }),

  /**
   * when update plan is successfull.
   */
  updatePlanSuccess: (payload = {}) => ({
    type: actions.UPDATE_PLAN_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with update plan.
   */
  updatePlanFailure: (payload = '', errors = {}) => ({
    type: actions.UPDATE_PLAN_ERROR,
    payload,
    errors
  }),

  /**
   * request to delete plan
   */
  deletePlan: (id) => ({
    type: actions.DELETE_PLAN_REQUEST,
    id
  }),

  /**
   * when delete plan is successfull.
   */
  deletePlanSuccess: (payload = {}) => ({
    type: actions.DELETE_PLAN_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with delete plan.
   */
  deletePlanFailure: (payload = '', errors = {}) => ({
    type: actions.DELETE_PLAN_ERROR,
    payload,
    errors
  }),

  /**
   * request to change status.
   */
  planChangeStatus: (payload = {}) => ({
    type: actions.PLAN_CHANGE_STATUS_REQUEST,
    payload
  }),

  /**
   * when change status is successfull.
   */
  planChangeStatusSuccess: (payload = {}) => ({
    type: actions.PLAN_CHANGE_STATUS_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with change status.
   */
  planChangeStatusFailure: (payload = '', errors = {}) => ({
    type: actions.PLAN_CHANGE_STATUS_ERROR,
    payload,
    errors
  }),

  /**
   * Change the modal popup state.
   */
  changeUpdateModalState: (payload = true) => ({
    type: actions.MODAL_ACTION,
    payload
  }),

  /**
   * request to get plan duration list.
   */
  getPlanDurationList: () => ({
    type: actions.GET_PLAN_DURATION_LIST_REQUEST
  }),

  /**
   * when change status is successfull.
   */
  getPlanDurationListSuccess: (payload = {}) => ({
    type: actions.GET_PLAN_DURATION_LIST_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with change status.
   */
  getPlanDurationListFailure: (payload = '', errors = {}) => ({
    type: actions.GET_PLAN_DURATION_LIST_ERROR,
    payload,
    errors
  }),

  getUserSubscriptionList: (queryParams) => ({
    type: actions.GET_USER_SUBSCRIPTION_LIST_REQUEST,
    queryParams
  }),

  getUserSubscriptionListSuccess: (payload = {}) => ({
    type: actions.GET_USER_SUBSCRIPTION_LIST_SUCCESS,
    payload
  }),

  getUserSubscriptionListFailure: (payload = '', errors = {}) => ({
    type: actions.GET_USER_SUBSCRIPTION_LIST_ERROR,
    payload,
    errors
  }),
};
export default actions;
