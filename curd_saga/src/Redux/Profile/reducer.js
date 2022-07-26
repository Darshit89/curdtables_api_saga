import actions from './actions';

const initState = {
  user: {},
  loading: false,
  message: null,
  errorData: {},
  action: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.PROFILE_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        user: {},
        action: action.type
      };
    case actions.PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        action: action.type
      };
    case actions.PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    default:
      return state;
  }
};
