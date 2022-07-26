import actions from './actions';

const initState = {
  lessonList: [],
  data: {},
  loading: false,
  message: null,
  errorData: {},
  action: null,
  id: '',
  queryParams: {},
  isLessonModalVisible: false,
  selectedItem: {},
  title: '',
  description: '',
  videos: [],
  sequence: 0,
  thumbnail_image: null,
  subLessonData: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.GET_LESSON_LIST_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.GET_LESSON_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        lessonList: action.payload.data,
        action: action.type
      };
    case actions.GET_LESSON_LIST_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.CREATE_LESSON_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.CREATE_LESSON_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type
      };
    case actions.CREATE_LESSON_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.GET_LESSON_BY_ID_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        action: action.type,
        id: ''
      };
    case actions.GET_LESSON_BY_ID_SUCCESS: {
      const { payload, type } = action;
      const { data } = payload;
      return {
        ...state,
        loading: false,
        lessonData: data.lesson,
        action: type,
        title: data.lesson.title,
        description: data.lesson.description,
        thumbnail_image: {
          uid: '1',
          name: data.lesson.thumbnail_image
        }
      };
    }
    case actions.GET_LESSON_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.UPDATE_LESSON_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.UPDATE_LESSON_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type
      };
    case actions.UPDATE_LESSON_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.DELETE_LESSON_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        action: action.type,
        id: ''
      };
    case actions.DELETE_LESSON_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type
      };
    case actions.DELETE_LESSON_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.LESSON_CHANGE_STATUS_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.LESSON_CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type
      };
    case actions.LESSON_CHANGE_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.MODAL_ACTION:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type,
        isLessonModalVisible: action.payload.isLessonModalVisible,
        selectedItem: action.payload
      };
    case actions.SAVE_LESSON_DATA:
      return {
        ...state,
        ...action.payload,
        action: action.type
      };
    case actions.ADD_VIDEO_DATA:
      return {
        ...state,
        videos: [...state.videos, action.payload],
        sequence: state.sequence + 1,
        action: action.type,
        isLessonModalVisible: false
      };
    case actions.UPDATE_VIDEO_DATA:
      const filtered = state.videos.filter(
        (video) => video.sequence !== action.payload.sequence
      );
      return {
        ...state,
        videos: [...filtered, action.payload],
        action: action.type,
        isLessonModalVisible: false
      };
    case actions.DELETE_VIDEO_DATA: {
      const filteredVideo = state.videos.filter(
        (video) => video.sequence !== action.payload.sequence
      );
      filteredVideo.map((item, index) => {
        return (item.sequence = index + 1);
      });
      return {
        ...state,
        videos: filteredVideo,
        action: action.type
      };
    }
    case actions.DRAG_AND_DROP_VIDEO_DATA:
      return {
        ...state,
        videos: action.payload
      };
    case actions.GET_SUB_LESSON_BY_ID_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        action: action.type,
        id: ''
      };
    case actions.GET_SUB_LESSON_BY_ID_SUCCESS: {
      const { payload, type } = action;
      const { data } = payload;
      return {
        ...state,
        loading: false,
        subLessonData: data,
        action: type,
        videos: data.payload
      };
    }
    case actions.GET_SUB_LESSON_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.EDIT_SINGLE_VIDEO_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.EDIT_SINGLE_VIDEO_SUCCESS:
      return {
        ...state,
        ...state,
        loading: false,
        data: action.payload,
        action: action.type,
        isLessonModalVisible: false
      };
    case actions.EDIT_SINGLE_VIDEO_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.DELETE_SINGLE_VIDEO_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        action: action.type,
        id: ''
      };
    case actions.DELETE_SINGLE_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type
      };
    case actions.DELETE_SINGLE_VIDEO_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
      case actions.RESET_LESSON: 
        return {
          ...initState,
          action:action.type,
        }; 
    default:
      return state;
  }
};
