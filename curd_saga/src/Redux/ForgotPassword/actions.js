const actions = {
  FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST",
  FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_ERROR: "FORGOT_PASSWORD_ERROR",

  /**
   * request to forgot-password.
   */
  forgotPassword: (payload = {}) => ({
    type: actions.FORGOT_PASSWORD_REQUEST,
    payload
  }),

  /**
   * when forgot-password is successfull.
   */
  forgotPasswordSuccess: (payload = {}) => ({
    type: actions.FORGOT_PASSWORD_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with forgot-Password.
   */
  forgotPasswordFailure: (payload = "", errors = {}) => ({
    type: actions.FORGOT_PASSWORD_ERROR,
    payload,
    errors
  })
};
export default actions;
