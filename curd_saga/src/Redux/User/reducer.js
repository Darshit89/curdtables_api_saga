import actions from './actions';

const initState = {
  userList: [],
  loading: false,
  message: null,
  errorData: {},
  action: null,
  id: '',
  userData: {},
  queryParams: {},
  isUserModalVisible: false,
  selectedItem: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.GET_USER_LIST_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        action: action.type,
        queryParams: {}
      };
    case actions.GET_USER_LIST_SUCCESS: {
      const { payload, type } = action;
      const { data } = payload;
      return {
        ...state,
        loading: false,
        userList: data,
        action: type
      };
    }
    case actions.GET_USER_LIST_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.CREATE_USER_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        userData: {},
        action: action.type
      };
    case actions.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload,
        action: action.type
      };
    case actions.CREATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.GET_USER_BY_ID_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        action: action.type,
        id: ''
      };
    case actions.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload.data,
        action: action.type
      };
    case actions.GET_USER_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.UPDATE_USER_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        userData: {},
        action: action.type
      };
    case actions.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload,
        action: action.type,
        isUserModalVisible: false
      };
    case actions.UPDATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.DELETE_USER_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        action: action.type,
        id: ''
      };
    case actions.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload,
        action: action.type
      };
    case actions.DELETE_USER_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.CHANGE_STATUS_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        userData: {},
        action: action.type
      };
    case actions.CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload,
        action: action.type
      };
    case actions.CHANGE_STATUS_ERROR:
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
        isUserModalVisible: action.payload.isUserModalVisible,
        selectedItem: {
          id: action.payload.id,
          name: action.payload.name
        }
      };
    default:
      return state;
  }
};
