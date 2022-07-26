import actions from './actions';

const initState = {
  artistList: [],
  data: {},
  loading: false,
  message: null,
  errorData: {},
  action: null,
  id: '',
  queryParams: {},
  isArtistModalVisible: false,
  selectedItem: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.GET_ARTIST_LIST_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.GET_ARTIST_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        artistList: action.payload.data,
        action: action.type
      };
    case actions.GET_ARTIST_LIST_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.CREATE_ARTIST_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.CREATE_ARTIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type
      };
    case actions.CREATE_ARTIST_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.GET_ARTIST_BY_ID_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        action: action.type,
        id: ''
      };
    case actions.GET_ARTIST_BY_ID_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        action: action.type
      };
    }
    case actions.GET_ARTIST_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.UPDATE_ARTIST_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type,
        id: ''
      };
    case actions.UPDATE_ARTIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type,
        isArtistModalVisible: false
      };
    case actions.UPDATE_ARTIST_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.DELETE_ARTIST_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        action: action.type,
        id: ''
      };
    case actions.DELETE_ARTIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type
      };
    case actions.DELETE_ARTIST_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.ARTIST_CHANGE_STATUS_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.ARTIST_CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type
      };
    case actions.ARTIST_CHANGE_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.MODAL_ACTION: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type,
        isArtistModalVisible: action.payload.isArtistModalVisible,
        selectedItem: {
          id: action.payload.id,
          name: action.payload.name,
          avatar: {
            uid: '1',
            name: action.payload.avatar
          },
          facebook_url: action.payload.facebook_url,
          instagram_url: action.payload.instagram_url,
          twitter_url: action.payload.twitter_url
        }
      };
    }
    default:
      return state;
  }
};
