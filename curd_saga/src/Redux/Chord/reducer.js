import actions from './actions';

const initState = {
  chordList: [],
  data: {},
  loading: false,
  message: null,
  errorData: {},
  action: null,
  id: '',
  queryParams: {},
  isChordModalVisible: false,
  selectedItem: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.GET_CHORD_LIST_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.GET_CHORD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        chordList: action.payload.data,
        action: action.type
      };
    case actions.GET_CHORD_LIST_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.CREATE_CHORD_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.CREATE_CHORD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type
      };
    case actions.CREATE_CHORD_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.GET_CHORD_BY_ID_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        action: action.type,
        id: '',
        isChordModalVisible: true
      };
    case actions.GET_CHORD_BY_ID_SUCCESS: {
      const { payload, type } = action;
      const { data } = payload;
      return {
        ...state,
        loading: false,
        data: data,
        action: type
      };
    }
    case actions.GET_CHORD_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.UPDATE_CHORD_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type,
        id: ''
      };
    case actions.UPDATE_CHORD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type,
        isChordModalVisible: false
      };
    case actions.UPDATE_CHORD_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.DELETE_CHORD_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        action: action.type,
        id: ''
      };
    case actions.DELETE_CHORD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type
      };
    case actions.DELETE_CHORD_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.CHORD_CHANGE_STATUS_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.CHORD_CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type
      };
    case actions.CHORD_CHANGE_STATUS_ERROR:
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
        isChordModalVisible: action.payload.isChordModalVisible,
        selectedItem: {
          id: action.payload.id,
          name: action.payload.name,
          image: {
            uid: '1',
            name: action.payload.image
          },
          audio_file: {
            uid: '2',
            name: action.payload.audio_file
          }
        }
      };
    default:
      return state;
  }
};
