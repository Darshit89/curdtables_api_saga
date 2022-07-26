const actions = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',

  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERROR: 'LOGOUT_ERROR',

  UPDATE_EMAIL: 'UPDATE_EMAIL',

  /**
   * checks the authorization.
   */
  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),

  /**
   * request to login.
   */
  login: (payload = {}) => ({
    type: actions.LOGIN_REQUEST,
    payload
  }),

  /**
   * when login is successfull.
   */
  loginSuccess: (payload = {}, token = '') => ({
    type: actions.LOGIN_SUCCESS,
    payload,
    token
  }),

  /**
   * when something went wrong with login.
   */
  loginFailure: (payload = '', errors = {}) => ({
    type: actions.LOGIN_ERROR,
    payload,
    errors
  }),

  /**
   * logs user out
   */
  logout: () => ({
    type: actions.LOGOUT_REQUEST
  }),

  /**
   * logging out success.
   */
  logoutSuccess: () => ({
    type: actions.LOGOUT_SUCCESS
  }),

  /**
   * something went wrong while logging out.
   */
  logoutError: () => ({
    type: actions.LOGOUT_ERROR
  }),

  /**
   * update header email when its changed from profile update email
   */
  updateEmail: (payload = {}) => ({
    type: actions.UPDATE_EMAIL,
    payload
  })

};
export default actions;
