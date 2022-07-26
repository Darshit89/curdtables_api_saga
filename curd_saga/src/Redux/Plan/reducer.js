import actions from './actions';

const initState = {
  planList: [],
  data: {},
  loading: false,
  message: null,
  errorData: {},
  action: null,
  id: '',
  queryParams: {},
  isPlanModalVisible: false,
  selectedItem: {},
  planDurationList: [],
  subscriptionList: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.GET_PLAN_LIST_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.GET_PLAN_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        planList: action.payload.data,
        action: action.type
      };
    case actions.GET_PLAN_LIST_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.CREATE_PLAN_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.CREATE_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type
      };
    case actions.CREATE_PLAN_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.GET_PLAN_BY_ID_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        action: action.type,
        id: '',
        isPlanModalVisible: true
      };
    case actions.GET_PLAN_BY_ID_SUCCESS: {
      const { payload, type } = action;
      const { data } = payload;
      return {
        ...state,
        loading: false,
        data: data,
        action: type
      };
    }
    case actions.GET_PLAN_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.UPDATE_PLAN_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.UPDATE_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type,
        isPlanModalVisible: false
      };
    case actions.UPDATE_PLAN_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type,
        isPlanModalVisible: true
      };
    case actions.DELETE_PLAN_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        action: action.type,
        id: ''
      };
    case actions.DELETE_PLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type
      };
    case actions.DELETE_PLAN_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.PLAN_CHANGE_STATUS_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.PLAN_CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type
      };
    case actions.PLAN_CHANGE_STATUS_ERROR:
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
        isPlanModalVisible: action.payload.isPlanModalVisible,
        selectedItem: action.payload
      };
    case actions.GET_PLAN_DURATION_LIST_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.GET_PLAN_DURATION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        planDurationList: action.payload.planTypes,
        action: action.type
      };
    case actions.GET_PLAN_DURATION_LIST_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
      case actions.GET_USER_SUBSCRIPTION_LIST_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        action: action.type
      };
    case actions.GET_USER_SUBSCRIPTION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        subscriptionList: action.payload,
        action: action.type
      };
    case actions.GET_USER_SUBSCRIPTION_LIST_ERROR:
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
