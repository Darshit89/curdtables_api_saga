const actions = {
  GET_ARTIST_LIST_REQUEST: 'GET_ARTIST_LIST_REQUEST',
  GET_ARTIST_LIST_SUCCESS: 'GET_ARTIST_LIST_SUCCESS',
  GET_ARTIST_LIST_ERROR: 'GET_ARTIST_LIST_ERROR',

  CREATE_ARTIST_REQUEST: 'CREATE_ARTIST_REQUEST',
  CREATE_ARTIST_SUCCESS: 'CREATE_ARTIST_SUCCESS',
  CREATE_ARTIST_ERROR: 'CREATE_ARTIST_ERROR',

  GET_ARTIST_BY_ID_REQUEST: 'GET_ARTIST_BY_ID_REQUEST',
  GET_ARTIST_BY_ID_SUCCESS: 'GET_ARTIST_BY_ID_SUCCESS',
  GET_ARTIST_BY_ID_ERROR: 'GET_ARTIST_BY_ID_ERROR',

  UPDATE_ARTIST_REQUEST: 'UPDATE_ARTIST_REQUEST',
  UPDATE_ARTIST_SUCCESS: 'UPDATE_ARTIST_SUCCESS',
  UPDATE_ARTIST_ERROR: 'UPDATE_ARTIST_ERROR',

  DELETE_ARTIST_REQUEST: 'DELETE_ARTIST_REQUEST',
  DELETE_ARTIST_SUCCESS: 'DELETE_ARTIST_SUCCESS',
  DELETE_ARTIST_ERROR: 'DELETE_ARTIST_ERROR',

  ARTIST_CHANGE_STATUS_REQUEST: 'ARTIST_CHANGE_STATUS_REQUEST',
  ARTIST_CHANGE_STATUS_SUCCESS: 'ARTIST_CHANGE_STATUS_SUCCESS',
  ARTIST_CHANGE_STATUS_ERROR: 'ARTIST_CHANGE_STATUS_ERROR',

  MODAL_ACTION: 'MODAL_ACTION',

  /**
  * request to get ARTIST list.
  */
  getArtistList: (queryParams) => ({
    type: actions.GET_ARTIST_LIST_REQUEST,
    queryParams
  }),

  /**
   * when Artist list is successfull.
   */
  getArtistListSuccess: (payload = {}) => ({
    type: actions.GET_ARTIST_LIST_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with Artist list.
   */
  getArtistListFailure: (payload = '', errors = {}) => ({
    type: actions.GET_ARTIST_LIST_ERROR,
    payload,
    errors
  }),

  /**
   * request to create Artist.
   */
  createArtist: (payload = {}) => ({
    type: actions.CREATE_ARTIST_REQUEST,
    payload
  }),

  /**
   * when create artist is successfull.
   */
  createArtistSuccess: (payload = {}) => ({
    type: actions.CREATE_ARTIST_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with create artist.
   */

  createArtistFailure: (payload = '', errors = {}) => ({
    type: actions.CREATE_ARTIST_ERROR,
    payload,
    errors
  }),

  /**
   * request to artist by id.
   */
  getArtistById: (id) => ({
    type: actions.GET_ARTIST_BY_ID_REQUEST,
    id
  }),

  /**
   * when artist by id is successfull.
   */
  getArtistByIdSuccess: (payload = {}) => ({
    type: actions.GET_ARTIST_BY_ID_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with get artist by id.
   */

  getArtistByIdFailure: (payload = '', errors = {}) => ({
    type: actions.GET_ARTIST_BY_ID_ERROR,
    payload,
    errors
  }),

  /**
   * request to update Artist.
   */
  updateArtist: (payload = {}) => ({
    type: actions.UPDATE_ARTIST_REQUEST,
    payload
  }),

  /**
   * when update Artist is successfull.
   */
  updateArtistSuccess: (payload = {}) => ({
    type: actions.UPDATE_ARTIST_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with update Artist.
   */

  updateArtistFailure: (payload = '', errors = {}) => ({
    type: actions.UPDATE_ARTIST_ERROR,
    payload,
    errors
  }),

  /**
   * request to delete Artist.
   */
  deleteArtist: (id) => ({
    type: actions.DELETE_ARTIST_REQUEST,
    id
  }),

  /**
   * when delete Artist is successfull.
   */
  deleteArtistSuccess: (payload = {}) => ({
    type: actions.DELETE_ARTIST_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with delete Artist.
   */

  deleteArtistFailure: (payload = '', errors = {}) => ({
    type: actions.DELETE_ARTIST_ERROR,
    payload,
    errors
  }),

  /**
   * request to change status.
   */
  artistChangeStatus: (payload = {}) => ({
    type: actions.ARTIST_CHANGE_STATUS_REQUEST,
    payload
  }),

  /**
   * when change status is successfull.
   */
  artistChangeStatusSuccess: (payload = {}) => ({
    type: actions.ARTIST_CHANGE_STATUS_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with change status.
   */
  artistChangeStatusFailure: (payload = '', errors = {}) => ({
    type: actions.ARTIST_CHANGE_STATUS_ERROR,
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
