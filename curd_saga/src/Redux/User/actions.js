const actions = {
  GET_USER_LIST_REQUEST: 'GET_USER_LIST_REQUEST',
  GET_USER_LIST_SUCCESS: 'GET_USER_LIST_SUCCESS',
  GET_USER_LIST_ERROR: 'GET_USER_LIST_ERROR',

  CREATE_USER_REQUEST: 'CREATE_USER_REQUEST',
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  CREATE_USER_ERROR: 'CREATE_USER_ERROR',

  GET_USER_BY_ID_REQUEST: 'GET_USER_BY_ID_REQUEST',
  GET_USER_BY_ID_SUCCESS: 'GET_USER_BY_ID_SUCCESS',
  GET_USER_BY_ID_ERROR: 'GET_USER_BY_ID_ERROR',

  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_ERROR: 'UPDATE_USER_ERROR',

  DELETE_USER_REQUEST: 'DELETE_USER_REQUEST',
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  DELETE_USER_ERROR: 'DELETE_USER_ERROR',

  CHANGE_STATUS_REQUEST: 'CHANGE_STATUS_REQUEST',
  CHANGE_STATUS_SUCCESS: 'CHANGE_STATUS_SUCCESS',
  CHANGE_STATUS_ERROR: 'CHANGE_STATUS_ERROR',

  MODAL_ACTION: 'MODAL_ACTION',

  /**
   * request to get user list.
   */
  getUserList: (queryParams) => ({
    type: actions.GET_USER_LIST_REQUEST,
    queryParams
  }),

  /**
   * when user list is successfull.
   */
  getUserListSuccess: (payload = {}) => ({
    type: actions.GET_USER_LIST_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with user list.
   */
  getUserListFailure: (payload = '', errors = {}) => ({
    type: actions.GET_USER_LIST_ERROR,
    payload,
    errors
  }),

  /**
   * request to create User.
   */
  createUser: (payload = {}) => ({
    type: actions.CREATE_USER_REQUEST,
    payload
  }),

  /**
   * when create User is successfull.
   */
  createUserSuccess: (payload = {}) => ({
    type: actions.CREATE_USER_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with create User.
   */

  createUserFailure: (payload = '', errors = {}) => ({
    type: actions.CREATE_USER_ERROR,
    payload,
    errors
  }),

  /**
   * request to User by id.
   */
  getUserById: (id) => ({
    type: actions.GET_USER_BY_ID_REQUEST,
    id
  }),

  /**
   * when user by id is successfull.
   */
  getUserByIdSuccess: (payload = {}) => ({
    type: actions.GET_USER_BY_ID_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with get user by id.
   */

  getUserByIdFailure: (payload = '', errors = {}) => ({
    type: actions.GET_USER_BY_ID_ERROR,
    payload,
    errors
  }),

  /**
   * request to update User.
   */
  updateUser: (payload = {}) => ({
    type: actions.UPDATE_USER_REQUEST,
    payload
  }),

  /**
   * when update User is successfull.
   */
  updateUserSuccess: (payload = {}) => ({
    type: actions.UPDATE_USER_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with update User.
   */

  updateUserFailure: (payload = '', errors = {}) => ({
    type: actions.UPDATE_USER_ERROR,
    payload,
    errors
  }),

  /**
   * request to delete user.
   */
  deleteUser: (id) => ({
    type: actions.DELETE_USER_REQUEST,
    id
  }),

  /**
   * when delete user is successfull.
   */
  deleteUserSuccess: (payload = {}) => ({
    type: actions.DELETE_USER_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with delete user.
   */

  deleteUserFailure: (payload = '', errors = {}) => ({
    type: actions.DELETE_USER_ERROR,
    payload,
    errors
  }),

  /**
   * request to change status.
   */
  changeStatus: (payload = {}) => ({
    type: actions.CHANGE_STATUS_REQUEST,
    payload
  }),

  /**
   * when change status is successfull.
   */
  changeStatusSuccess: (payload = {}) => ({
    type: actions.CHANGE_STATUS_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with change status.
   */
  changeStatusFailure: (payload = '', errors = {}) => ({
    type: actions.CHANGE_STATUS_ERROR,
    payload,
    errors
  }),
  
  /**
   * Change the modal popup state.
   */
  changeUpdateModalState: (payload = true) => ({
    type: actions.MODAL_ACTION,
    payload
  })
};

export default actions;
