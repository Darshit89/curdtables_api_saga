const actions = {
  GET_LESSON_LIST_REQUEST: 'GET_LESSON_LIST_REQUEST',
  GET_LESSON_LIST_SUCCESS: 'GET_LESSON_LIST_SUCCESS',
  GET_LESSON_LIST_ERROR: 'GET_LESSON_LIST_ERROR',

  CREATE_LESSON_REQUEST: 'CREATE_LESSON_REQUEST',
  CREATE_LESSON_SUCCESS: 'CREATE_LESSON_SUCCESS',
  CREATE_LESSON_ERROR: 'CREATE_LESSON_ERROR',

  GET_LESSON_BY_ID_REQUEST: 'GET_LESSON_BY_ID_REQUEST',
  GET_LESSON_BY_ID_SUCCESS: 'GET_LESSON_BY_ID_SUCCESS',
  GET_LESSON_BY_ID_ERROR: 'GET_LESSON_BY_ID_ERROR',

  UPDATE_LESSON_REQUEST: 'UPDATE_LESSON_REQUEST',
  UPDATE_LESSON_SUCCESS: 'UPDATE_LESSON_SUCCESS',
  UPDATE_LESSON_ERROR: 'UPDATE_LESSON_ERROR',

  DELETE_LESSON_REQUEST: 'DELETE_LESSON_REQUEST',
  DELETE_LESSON_SUCCESS: 'DELETE_LESSON_SUCCESS',
  DELETE_LESSON_ERROR: 'DELETE_LESSON_ERROR',

  LESSON_CHANGE_STATUS_REQUEST: 'LESSON_CHANGE_STATUS_REQUEST',
  LESSON_CHANGE_STATUS_SUCCESS: 'LESSON_CHANGE_STATUS_SUCCESS',
  LESSON_CHANGE_STATUS_ERROR: 'LESSON_CHANGE_STATUS_ERROR',

  MODAL_ACTION: 'MODAL_ACTION',

  SAVE_LESSON_DATA: 'SAVE_LESSON_DATA',
  ADD_VIDEO_DATA: 'ADD_VIDEO_DATA',
  UPDATE_VIDEO_DATA: 'UPDATE_VIDEO_DATA',
  DELETE_VIDEO_DATA: 'DELETE_VIDEO_DATA',
  DRAG_AND_DROP_VIDEO_DATA: 'DRAG_AND_DROP_VIDEO_DATA',

  GET_SUB_LESSON_BY_ID_REQUEST: 'GET_SUB_LESSON_BY_ID_REQUEST',
  GET_SUB_LESSON_BY_ID_SUCCESS: 'GET_SUB_LESSON_BY_ID_SUCCESS',
  GET_SUB_LESSON_BY_ID_ERROR: 'GET_SUB_LESSON_BY_ID_ERROR',

  EDIT_SINGLE_VIDEO_REQUEST: 'EDIT_SINGLE_VIDEO_REQUEST',
  EDIT_SINGLE_VIDEO_SUCCESS: 'EDIT_SINGLE_VIDEO_SUCCESS',
  EDIT_SINGLE_VIDEO_ERROR: 'EDIT_SINGLE_VIDEO_ERROR',

  DELETE_SINGLE_VIDEO_REQUEST: 'DELETE_SINGLE_VIDEO_REQUEST',
  DELETE_SINGLE_VIDEO_SUCCESS: 'DELETE_SINGLE_VIDEO_SUCCESS',
  DELETE_SINGLE_VIDEO_ERROR: 'DELETE_SINGLE_VIDEO_ERROR',

  RESET_LESSON: 'RESET_LESSON',
  /**
   * request to get lesson list.
   */
  getLessonList: (queryParams) => ({
    type: actions.GET_LESSON_LIST_REQUEST,
    queryParams
  }),

  /**
   * when lesson list is successfull.
   */
  getLessonListSuccess: (payload = {}) => ({
    type: actions.GET_LESSON_LIST_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with .lesson list.
   */
  getLessonListFailure: (payload = '', errors = {}) => ({
    type: actions.GET_LESSON_LIST_ERROR,
    payload,
    errors
  }),

  /**
   * request to create lesson.
   */
  createLesson: (payload = {}) => ({
    type: actions.CREATE_LESSON_REQUEST,
    payload
  }),

  /**
   * when create lesson is successfull.
   */
  createLessonSuccess: (payload = {}) => ({
    type: actions.CREATE_LESSON_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with create lesson.
   */
  createLessonFailure: (payload = '', errors = {}) => ({
    type: actions.CREATE_LESSON_ERROR,
    payload,
    errors
  }),

  /**
   * request to lesson by id.
   */
  getLessonById: (id) => ({
    type: actions.GET_LESSON_BY_ID_REQUEST,
    id
  }),

  /**
   * when lesson by id is successfull.
   */
  getLessonByIdSuccess: (payload = {}) => ({
    type: actions.GET_LESSON_BY_ID_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with get lesson by id.
   */
  getLessonByIdFailure: (payload = '', errors = {}) => ({
    type: actions.GET_LESSON_BY_ID_ERROR,
    payload,
    errors
  }),

  /**
   * request to update lesson.
   */
  updateLesson: (payload = {}) => ({
    type: actions.UPDATE_LESSON_REQUEST,
    payload
  }),

  /**
   * when update lesson is successfull.
   */
  updateLessonSuccess: (payload = {}) => ({
    type: actions.UPDATE_LESSON_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with update lesson.
   */
  updateLessonFailure: (payload = '', errors = {}) => ({
    type: actions.UPDATE_LESSON_ERROR,
    payload,
    errors
  }),

  /**
   * request to delete lesson.
   */
  deleteLesson: (id) => ({
    type: actions.DELETE_LESSON_REQUEST,
    id
  }),

  /**
   * when delete lesson is successfull.
   */
  deleteLessonSuccess: (payload = {}) => ({
    type: actions.DELETE_LESSON_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with delete lesson.
   */
  deleteLessonFailure: (payload = '', errors = {}) => ({
    type: actions.DELETE_LESSON_ERROR,
    payload,
    errors
  }),

  /**
   * request to change status.
   */
  lessonChangeStatus: (payload = {}) => ({
    type: actions.LESSON_CHANGE_STATUS_REQUEST,
    payload
  }),

  /**
   * when change status is successfull.
   */
  lessonChangeStatusSuccess: (payload = {}) => ({
    type: actions.LESSON_CHANGE_STATUS_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with change status.
   */
  lessonChangeStatusFailure: (payload = '', errors = {}) => ({
    type: actions.LESSON_CHANGE_STATUS_ERROR,
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
   * request to store lesson data.
   */
  saveLessonData: (payload = {}) => ({
    type: actions.SAVE_LESSON_DATA,
    payload
  }),

  /**
   * request to store video data.
   */
  addVideoData: (payload = []) => ({
    type: actions.ADD_VIDEO_DATA,
    payload
  }),

  /**
   * request to update video data.
   */
  updateVideoData: (payload = {}) => ({
    type: actions.UPDATE_VIDEO_DATA,
    payload
  }),

  /**
   * request to delete video data.
   */
  deleteVideoData: (payload = {}) => ({
    type: actions.DELETE_VIDEO_DATA,
    payload
  }),

  /**
   * request to drag and drop video data.
   */
  dragAndDropVideoData: (payload = []) => ({
    type: actions.DRAG_AND_DROP_VIDEO_DATA,
    payload
  }),

  /**
   * request to sub lesson by id.
   */
  getSubLessonById: (id, queryParams) => ({
    type: actions.GET_SUB_LESSON_BY_ID_REQUEST,
    id,
    queryParams
  }),

  /**
   * when sub lesson by id is successfull.
   */
  getSubLessonByIdSuccess: (payload = {}) => ({
    type: actions.GET_SUB_LESSON_BY_ID_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with get sub lesson by id.
   */
  getSubLessonByIdFailure: (payload = '', errors = {}) => ({
    type: actions.GET_SUB_LESSON_BY_ID_ERROR,
    payload,
    errors
  }),

  /**
   * when update single video.
   */
  editSingleVideo: (payload = {}) => ({
    type: actions.EDIT_SINGLE_VIDEO_REQUEST,
    payload
  }),

  /**
   * when update single video is successfull.
   */
  editSingleVideoSuccess: (payload = {}) => ({
    type: actions.EDIT_SINGLE_VIDEO_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with update single video.
   */
  editSingleVideoFailure: (payload = '', errors = {}) => ({
    type: actions.EDIT_SINGLE_VIDEO_ERROR,
    payload,
    errors
  }),

  /**
   * when delete single video.
   */
  deleteSingleVideo: (id) => ({
    type: actions.DELETE_SINGLE_VIDEO_REQUEST,
    id
  }),

  /**
   * when delete single video is successfull.
   */
  deleteSingleVideoSuccess: (payload = {}) => ({
    type: actions.DELETE_SINGLE_VIDEO_SUCCESS,
    payload
  }),

  /**
   * when something went wrong with delete single video.
   */
  deleteSingleVideoFailure: (payload = '', errors = {}) => ({
    type: actions.DELETE_SINGLE_VIDEO_ERROR,
    payload,
    errors
  }),

  resetLesson: (payload = {}) => ({
    type: actions.RESET_LESSON,
  }),
};
export default actions;
