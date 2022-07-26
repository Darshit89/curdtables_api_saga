const actions = {
  RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_ERROR: "RESET_PASSWORD_ERROR",

  /**
   * request to reset-password.
   */
  resetPassword: (payload = {}, token) => ({
    type: actions.RESET_PASSWORD_REQUEST,
    payload,
    token
  }),

  /**
   * when reset-password is successfull.
   */
  resetPasswordSuccess: (payload = {}) => ({
    type: actions.RESET_PASSWORD_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with reset-Password.
   */
  resetPasswordFailure: (payload = "", errors = {}) => ({
    type: actions.RESET_PASSWORD_ERROR,
    payload,
    errors
  })
};
export default actions;
