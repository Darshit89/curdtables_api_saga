const actions = {
  GET_CHORD_LIST_REQUEST: 'GET_CHORD_LIST_REQUEST',
  GET_CHORD_LIST_SUCCESS: 'GET_CHORD_LIST_SUCCESS',
  GET_CHORD_LIST_ERROR: 'GET_CHORD_LIST_ERROR',

  CREATE_CHORD_REQUEST: 'CREATE_CHORD_REQUEST',
  CREATE_CHORD_SUCCESS: 'CREATE_CHORD_SUCCESS',
  CREATE_CHORD_ERROR: 'CREATE_CHORD_ERROR',

  GET_CHORD_BY_ID_REQUEST: 'GET_CHORD_BY_ID_REQUEST',
  GET_CHORD_BY_ID_SUCCESS: 'GET_CHORD_BY_ID_SUCCESS',
  GET_CHORD_BY_ID_ERROR: 'GET_CHORD_BY_ID_ERROR',

  UPDATE_CHORD_REQUEST: 'UPDATE_CHORD_REQUEST',
  UPDATE_CHORD_SUCCESS: 'UPDATE_CHORD_SUCCESS',
  UPDATE_CHORD_ERROR: 'UPDATE_CHORD_ERROR',

  DELETE_CHORD_REQUEST: 'DELETE_CHORD_REQUEST',
  DELETE_CHORD_SUCCESS: 'DELETE_CHORD_SUCCESS',
  DELETE_CHORD_ERROR: 'DELETE_CHORD_ERROR',

  CHORD_CHANGE_STATUS_REQUEST: 'CHORD_CHANGE_STATUS_REQUEST',
  CHORD_CHANGE_STATUS_SUCCESS: 'CHORD_CHANGE_STATUS_SUCCESS',
  CHORD_CHANGE_STATUS_ERROR: 'CHORD_CHANGE_STATUS_ERROR',

  MODAL_ACTION: 'MODAL_ACTION',

  /**
   * request to get chord list.
   */
  getChordList: (queryParams) => ({
    type: actions.GET_CHORD_LIST_REQUEST,
    queryParams
  }),

  /**
   * when chord list is successfull.
   */
  getChordListSuccess: (payload = {}) => ({
    type: actions.GET_CHORD_LIST_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with chord list.
   */
  getChordListFailure: (payload = '', errors = {}) => ({
    type: actions.GET_CHORD_LIST_ERROR,
    payload,
    errors
  }),

  /**
   * request to create Chord.
   */
  createChord: (payload = {}) => ({
    type: actions.CREATE_CHORD_REQUEST,
    payload
  }),

  /**
   * when create chord is successfull.
   */
  createChordSuccess: (payload = {}) => ({
    type: actions.CREATE_CHORD_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with create Chord.
   */

  createChordFailure: (payload = '', errors = {}) => ({
    type: actions.CREATE_CHORD_ERROR,
    payload,
    errors
  }),

  /**
   * request to chord by id.
   */
  getChordById: (id) => ({
    type: actions.GET_CHORD_BY_ID_REQUEST,
    id
  }),

  /**
   * when chord by id is successfull.
   */
  getChordByIdSuccess: (payload = {}) => ({
    type: actions.GET_CHORD_BY_ID_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with get chords by id.
   */

  getChordByIdFailure: (payload = '', errors = {}) => ({
    type: actions.GET_CHORD_BY_ID_ERROR,
    payload,
    errors
  }),

  /**
   * request to update User.
   */
  updateChord: (payload = {}, id) => ({
    type: actions.UPDATE_CHORD_REQUEST,
    payload,
    id
  }),

  /**
   * when update CHORD is successfull.
   */
  updateChordSuccess: (payload = {}) => ({
    type: actions.UPDATE_CHORD_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with update CHORD.
   */

  updateChordFailure: (payload = '', errors = {}) => ({
    type: actions.UPDATE_CHORD_ERROR,
    payload,
    errors
  }),

  /**
   * request to delete CHORD.
   */
  deleteChord: (id) => ({
    type: actions.DELETE_CHORD_REQUEST,
    id
  }),

  /**
   * when delete CHORD is successfull.
   */
  deleteChordSuccess: (payload = {}) => ({
    type: actions.DELETE_CHORD_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with delete CHORD.
   */

  deleteChordFailure: (payload = '', errors = {}) => ({
    type: actions.DELETE_CHORD_ERROR,
    payload,
    errors
  }),

  /**
   * request to change status.
   */
  chordChangeStatus: (payload = {}) => ({
    type: actions.CHORD_CHANGE_STATUS_REQUEST,
    payload
  }),

  /**
   * when change status is successfull.
   */
  chordChangeStatusSuccess: (payload = {}) => ({
    type: actions.CHORD_CHANGE_STATUS_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with change status.
   */
  chordChangeStatusFailure: (payload = '', errors = {}) => ({
    type: actions.CHORD_CHANGE_STATUS_ERROR,
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
