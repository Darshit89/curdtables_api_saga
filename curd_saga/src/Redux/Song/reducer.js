import actions from './actions';

const initState = {
  songList: [],
  data: {},
  loading: false,
  message: null,
  errorData: {},
  action: null,
  id: '',
  queryParams: {},
  isSongModalVisible: false,
  selectedItem: {},
  artistList: [],
  chordList: [],
  selectedSongData: {},
  chordData: {},
  modaldata: {},
  songData: {},
  updateSongResponse: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case actions.GET_SONG_LIST_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.GET_SONG_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        songList: action.payload.data,
        action: action.type
      };
    case actions.GET_SONG_LIST_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.CREATE_SONG_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.CREATE_SONG_SUCCESS: 
      return {
        ...state,
        loading: false,
        songResponse: action.payload.data,
        action: action.type
      };
    case actions.CREATE_SONG_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.GET_SONG_BY_ID_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        action: action.type,
        id: ''
      };
    case actions.GET_SONG_BY_ID_SUCCESS: {
      return {
        ...state,
        loading: false,
        songResponse: action.payload,
        action: action.type,
        selectedSongData: {
          title: action.payload.title,
          cover_image: {
            uid: '1',
            name: action.payload.cover_image
          },
          audio_file: {
            uid: '2',
            name: action.payload.audio_file
          }
        }
      };
    }
    case actions.GET_SONG_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.UPDATE_SONG_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type,
        id: ''
      };
    case actions.UPDATE_SONG_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        updateSongResponse: action.payload.data,
        action: action.type
      };
    case actions.UPDATE_SONG_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.DELETE_SONG_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        action: action.type,
        id: ''
      };
    case actions.DELETE_SONG_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type
      };
    case actions.DELETE_SONG_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.SONG_CHANGE_STATUS_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.SONG_CHANGE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type
      };
    case actions.SONG_CHANGE_STATUS_ERROR:
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
        modaldata: action.payload,
        action: action.type,
        isSongModalVisible: action.payload.isSongModalVisible
      };
    case actions.ARTIST_LIST_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.ARTIST_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        artistList: action.payload.data,
        action: action.type
      };
    case actions.ARTIST_LIST_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.CHORD_LIST_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        data: {},
        action: action.type
      };
    case actions.CHORD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        chordList: action.payload.data,
        action: action.type
      };
    case actions.CHORD_LIST_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.ADD_UPDATE_CHORD_IN_PLAYER_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        chordData: {},
        action: action.type
      };
    case actions.ADD_UPDATE_CHORD_IN_PLAYER_SUCCESS:
      return {
        ...state,
        loading: false,
        chordData: action.payload.data,
        action: action.type,
        isSongModalVisible: false
      };
    case actions.ADD_UPDATE_CHORD_IN_PLAYER_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload,
        errorData: action.errors || {},
        action: action.type
      };
    case actions.DELETE_CHORD_IN_PLAYER_REQUEST:
      return {
        ...state,
        errorData: {},
        loading: true,
        message: null,
        action: action.type,
        data: {}
      };
    case actions.DELETE_CHORD_IN_PLAYER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        action: action.type,
        isSongModalVisible: false
      };
    case actions.DELETE_CHORD_IN_PLAYER_ERROR:
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
