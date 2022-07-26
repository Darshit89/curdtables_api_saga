import actions from "./actions";

const initState = {
  data: {},
  loading: false,
  message: null,
  errorData: {},
  action: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type
      };
    case actions.FORGOT_PASSWORD_ERROR:
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
