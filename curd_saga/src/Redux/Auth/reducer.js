import actions from './actions';

const initState = {
  user: {},
  token: null,
  loading: false,
  message: null,
  errorData: {},
  action: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        token: null,
        action: action.type
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.token,
        action: action.type
      };
    case actions.LOGIN_ERROR:
      return {
        ...state,
        token: null,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.LOGOUT_REQUEST:
      return {
        ...initState,
        action: action.type
      };
    case actions.LOGOUT_SUCCESS:
      return {
        ...initState,
        user: {},
        token: null,
        action: action.type
      };
    case actions.LOGOUT_ERROR:
      return {
        ...state,
        action: action.type
      };
    case actions.UPDATE_EMAIL:
      return {
        ...state,
        loading: false,
        user: action.payload.data.user,
        action: action.type
      };
    default:
      return state;
  }
};
