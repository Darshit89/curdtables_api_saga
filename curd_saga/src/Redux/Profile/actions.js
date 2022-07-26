const actions = {
  PROFILE_REQUEST: "PROFILE_REQUEST",
  PROFILE_SUCCESS: "PROFILE_SUCCESS",
  PROFILE_ERROR: "PROFILE_ERROR",

  /**
   * request to profile.
   */
  profile: (payload = {}) => ({
    type: actions.PROFILE_REQUEST,
    payload
  }),

  /**
   * when profile is successfull.
   */
  profileSuccess: (payload = {}) => ({
    type: actions.PROFILE_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with profile.
   */
  profileFailure: (payload = "", errors = {}) => ({
    type: actions.PROFILE_ERROR,
    payload,
    errors
  })
};
export default actions;
