import { all, takeEvery, put } from 'redux-saga/effects';
import actions from './actions';
import { axiosGet, axiosPost, axiosDelete, axiosPut } from '../axiosHelper';
import * as queryString from 'query-string';

/**
 * Request to get song list.
 */
export function* getSongListRequest({ queryParams }) {
  try {
    const { data } = yield axiosGet(`song?${queryParams}`);
    yield put(actions.getSongListSuccess(data));
  } catch (error) {
    yield put(actions.getSongListFailure(error.message, error.data || {}));
  }
}

/**
 * Request to create Song.
 */
export function* createSongRequest({ payload }) {
  try {
    const { data } = yield axiosPost(payload, 'song/create');
    yield put(actions.createSongSuccess(data));
  } catch (error) {
    yield put(actions.createSongFailure(error.message, error.data || {}));
  }
}

/**
 * Request to update Song.
 */
export function* updateSongRequest({ payload , id}) {
  try {
    const { data } = yield axiosPut(payload, `song/update/${id}`);
    yield put(actions.getSongById(data.data.id));
  } catch (error) {
    yield put(actions.updateSongFailure(error.message, error.data || {}));
  }
}

/**
 * Request to get song by id.
 */
export function* getSongById({ id }) {
  try {
    const { data } = yield axiosGet(`song/${id}`);
    yield put(actions.getSongByIdSuccess(data.data));
  } catch (error) {
    yield put(actions.getSongByIdFailure(error.message, error.data || {}));
  }
}

/**
 * Request to Delete song.
 */
export function* deleteSongRequest({ id }) {
  try {
    const { data } = yield axiosDelete(`song/delete/${id}`);
    yield put(actions.deleteSongSuccess(data));
    const queryParams = {
      page: 1
    };
    yield put(actions.getSongList(queryString.stringify(queryParams)));
  } catch (error) {
    yield put(actions.deleteSongFailure(error.message, error.data || {}));
  }
}

/**
 * Request to change status
 */
export function* changeStatusRequest({ payload }) {
  try {
    const { data } = yield axiosPut(payload, 'song/change-status');
    yield put(actions.songChangeStatusSuccess(data));
    const queryParams = {
      page: 1
    };
    yield put(actions.getSongList(queryString.stringify(queryParams)));
  } catch (error) {
    yield put(actions.songChangeStatusFailure(error.message, error.data || {}));
  }
}

/**
 * Request to get all artist list.
 */
export function* getArtistListRequest() {
  try {
    const { data } = yield axiosGet(`artist/artist-list`);
    yield put(actions.getArtistListSuccess(data));
  } catch (error) {
    yield put(actions.getArtistListFailure(error.message, error.data || {}));
  }
}

/**
 * Request to get chord list.
 */
export function* getChordList() {
  try {
    const { data } = yield axiosGet(`chord/list`);
    yield put(actions.getChordListSuccess(data));
  } catch (error) {
    yield put(actions.getChordListFailure(error.message, error.data || {}));
  }
}

/**
 * Request to Add/update Chord in player
 */
 export function* addUpdateChord({ payload }) {
  try {
    const { data } = yield axiosPost(payload, 'song/add-chords');
    yield put(actions.addUpdateChordSuccess(data));
    yield put(actions.getSongById(`${data.data._pivot_song_id}`));
  } catch (error) {
    yield put(actions.addUpdateChordFailure(error.message, error.data || {}));
  }
}

/**
 * Request to delete Chord in player
 */
 export function* deleteChord({ payload }) {
  try {
    const { data } = yield axiosPost(payload, 'song/remove-chords');  
    yield put(actions.deleteChordSuccess(data));
    yield put(actions.getSongById(`${data.data.song_id}`));
  } catch (error) {
    yield put(actions.deleteChordFailure(error.message, error.data || {}));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.GET_SONG_LIST_REQUEST, getSongListRequest)]);
  yield all([takeEvery(actions.CREATE_SONG_REQUEST, createSongRequest)]);
  yield all([takeEvery(actions.GET_SONG_BY_ID_REQUEST, getSongById)]);
  yield all([takeEvery(actions.UPDATE_SONG_REQUEST, updateSongRequest)]);
  yield all([takeEvery(actions.DELETE_SONG_REQUEST, deleteSongRequest)]);
  yield all([
    takeEvery(actions.SONG_CHANGE_STATUS_REQUEST, changeStatusRequest)
  ]);
  yield all([takeEvery(actions.ARTIST_LIST_REQUEST, getArtistListRequest)]);
  yield all([takeEvery(actions.CHORD_LIST_REQUEST, getChordList)]);
  yield all([takeEvery(actions.ADD_UPDATE_CHORD_IN_PLAYER_REQUEST, addUpdateChord)]);
  yield all([takeEvery(actions.DELETE_CHORD_IN_PLAYER_REQUEST, deleteChord)]);

}
