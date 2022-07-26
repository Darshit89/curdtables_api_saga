const actions = {
  GET_SONG_LIST_REQUEST: 'GET_SONG_LIST_REQUEST',
  GET_SONG_LIST_SUCCESS: 'GET_SONG_LIST_SUCCESS',
  GET_SONG_LIST_ERROR: 'GET_SONG_LIST_ERROR',

  CREATE_SONG_REQUEST: 'CREATE_SONG_REQUEST',
  CREATE_SONG_SUCCESS: 'CREATE_SONG_SUCCESS',
  CREATE_SONG_ERROR: 'CREATE_SONG_ERROR',

  GET_SONG_BY_ID_REQUEST: 'GET_SONG_BY_ID_REQUEST',
  GET_SONG_BY_ID_SUCCESS: 'GET_SONG_BY_ID_SUCCESS',
  GET_SONG_BY_ID_ERROR: 'GET_SONG_BY_ID_ERROR',

  UPDATE_SONG_REQUEST: 'UPDATE_SONG_REQUEST',
  UPDATE_SONG_SUCCESS: 'UPDATE_SONG_SUCCESS',
  UPDATE_SONG_ERROR: 'UPDATE_SONG_ERROR',

  DELETE_SONG_REQUEST: 'DELETE_SONG_REQUEST',
  DELETE_SONG_SUCCESS: 'DELETE_SONG_SUCCESS',
  DELETE_SONG_ERROR: 'DELETE_SONG_ERROR',

  SONG_CHANGE_STATUS_REQUEST: 'SONG_CHANGE_STATUS_REQUEST',
  SONG_CHANGE_STATUS_SUCCESS: 'SONG_CHANGE_STATUS_SUCCESS',
  SONG_CHANGE_STATUS_ERROR: 'SONG_CHANGE_STATUS_ERROR',

  MODAL_ACTION: 'MODAL_ACTION',

  ARTIST_LIST_REQUEST: 'ARTIST_LIST_REQUEST',
  ARTIST_LIST_SUCCESS: 'ARTIST_LIST_SUCCESS',
  ARTIST_LIST_ERROR: 'ARTIST_LIST_ERROR',

  CHORD_LIST_REQUEST: 'CHORD_LIST_REQUEST',
  CHORD_LIST_SUCCESS: 'CHORD_LIST_SUCCESS',
  CHORD_LIST_ERROR: 'CHORD_LIST_ERROR',

  ADD_UPDATE_CHORD_IN_PLAYER_REQUEST: 'ADD_UPDATE_CHORD_IN_PLAYER_REQUEST',
  ADD_UPDATE_CHORD_IN_PLAYER_SUCCESS: 'ADD_UPDATE_CHORD_IN_PLAYER_SUCCESS',
  ADD_UPDATE_CHORD_IN_PLAYER_ERROR: 'ADD_UPDATE_CHORD_IN_PLAYER_ERROR',

  DELETE_CHORD_IN_PLAYER_REQUEST: 'DELETE_CHORD_IN_PLAYER_REQUEST',
  DELETE_CHORD_IN_PLAYER_SUCCESS: 'DELETE_CHORD_IN_PLAYER_SUCCESS',
  DELETE_CHORD_IN_PLAYER_ERROR: 'DELETE_CHORD_IN_PLAYER_ERROR',

  /**
   * request to get song list.
   */
  getSongList: (queryParams) => ({
    type: actions.GET_SONG_LIST_REQUEST,
    queryParams
  }),

  /**
   * when song list is successfull.
   */
  getSongListSuccess: (payload = {}) => ({
    type: actions.GET_SONG_LIST_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with song list.
   */
  getSongListFailure: (payload = '', errors = {}) => ({
    type: actions.GET_SONG_LIST_ERROR,
    payload,
    errors
  }),

  /**
   * request to create song.
   */
  createSong: (payload = {}) => ({
    type: actions.CREATE_SONG_REQUEST,
    payload
  }),

  /**
   * when create song is successfull.
   */
  createSongSuccess: (payload = {}) => ({
    type: actions.CREATE_SONG_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with create song.
   */

  createSongFailure: (payload = '', errors = {}) => ({
    type: actions.CREATE_SONG_ERROR,
    payload,
    errors
  }),

  /**
   * request to song by id.
   */
  getSongById: (id) => ({
    type: actions.GET_SONG_BY_ID_REQUEST,
    id
  }),

  /**
   * when song by id is successfull.
   */
  getSongByIdSuccess: (payload = {}) => ({
    type: actions.GET_SONG_BY_ID_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with get song by id.
   */

  getSongByIdFailure: (payload = '', errors = {}) => ({
    type: actions.GET_SONG_BY_ID_ERROR,
    payload,
    errors
  }),

  /**
   * request to update song.
   */
  updateSong: (payload = {}, id) => ({
    type: actions.UPDATE_SONG_REQUEST,
    payload,
    id
  }),

  /**
   * when update song is successfull.
   */
  updateSongSuccess: (payload = {}) => ({
    type: actions.UPDATE_SONG_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with update song.
   */

  updateSongFailure: (payload = '', errors = {}) => ({
    type: actions.UPDATE_SONG_ERROR,
    payload,
    errors
  }),

  /**
   * request to delete song.
   */
  deleteSong: (id) => ({
    type: actions.DELETE_SONG_REQUEST,
    id
  }),

  /**
   * when delete Song is successfull.
   */
  deleteSongSuccess: (payload = {}) => ({
    type: actions.DELETE_SONG_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with delete song.
   */

  deleteSongFailure: (payload = '', errors = {}) => ({
    type: actions.DELETE_SONG_ERROR,
    payload,
    errors
  }),

  /**
   * request to change status.
   */
  songChangeStatus: (payload = {}) => ({
    type: actions.SONG_CHANGE_STATUS_REQUEST,
    payload
  }),

  /**
   * when change status is successfull.
   */
  songChangeStatusSuccess: (payload = {}) => ({
    type: actions.SONG_CHANGE_STATUS_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with change status.
   */
  songChangeStatusFailure: (payload = '', errors = {}) => ({
    type: actions.SONG_CHANGE_STATUS_ERROR,
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
   * request to get ARTIST list.
   */
  getArtistList: () => ({
    type: actions.ARTIST_LIST_REQUEST
  }),

  /**
   * when Artist list is successfull.
   */
  getArtistListSuccess: (payload = {}) => ({
    type: actions.ARTIST_LIST_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with Artist list.
   */
  getArtistListFailure: (payload = '', errors = {}) => ({
    type: actions.ARTIST_LIST_ERROR,
    payload,
    errors
  }),

  /**
   * request to get chord list.
   */
  getChordList: () => ({
    type: actions.CHORD_LIST_REQUEST
  }),

  /**
   * when chord list is successfull.
   */
  getChordListSuccess: (payload = {}) => ({
    type: actions.CHORD_LIST_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with chord list.
   */
  getChordListFailure: (payload = '', errors = {}) => ({
    type: actions.CHORD_LIST_ERROR,
    payload,
    errors
  }),

  /**
   * request to add/update chord in player.
   */
  addUpdateChord: (payload = {}) => ({
    type: actions.ADD_UPDATE_CHORD_IN_PLAYER_REQUEST,
    payload
  }),

  /**
   * when add/update chord in player is successfull.
   */
  addUpdateChordSuccess: (payload = {}) => ({
    type: actions.ADD_UPDATE_CHORD_IN_PLAYER_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with add/update c.hord in player
   */
  addUpdateChordFailure: (payload = '', errors = {}) => ({
    type: actions.ADD_UPDATE_CHORD_IN_PLAYER_ERROR,
    payload,
    errors
  }),

  /**
   * request to delete chord.
   */
  deleteChord: (payload = {}) => ({
    type: actions.DELETE_CHORD_IN_PLAYER_REQUEST,
    payload
  }),

  /**
   * when delete chord is successfull.
   */
  deleteChordSuccess: (payload = {}) => ({
    type: actions.DELETE_CHORD_IN_PLAYER_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with delete chord.
   */

  deleteChordFailure: (payload = '', errors = {}) => ({
    type: actions.DELETE_SONG_IN_PLAYER_ERROR,
    payload,
    errors
  })
};
export default actions;
