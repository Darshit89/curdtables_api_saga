const actions = {
  CHANGE_PASSWORD_REQUEST: "CHANGE_PASSWORD_REQUEST",
  CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_ERROR: "CHANGE_PASSWORD_ERROR",

  /**
   * request to change-password.
   */
  changePassword: (payload = {}) => ({
    type: actions.CHANGE_PASSWORD_REQUEST,
    payload
  }),

  /**
   * when change-password is successfull.
   */
  changePasswordSuccess: (payload = {}) => ({
    type: actions.CHANGE_PASSWORD_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with change-Password.
   */
  changePasswordFailure: (payload = "", errors = {}) => ({
    type: actions.CHANGE_PASSWORD_ERROR,
    payload,
    errors
  })
};
export default actions;
