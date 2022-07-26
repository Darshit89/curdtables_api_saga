/** Import and export saga from here */
import { all } from 'redux-saga/effects';
import authSaga from './Auth/saga';
import forgotPasswordSaga from './ForgotPassword/saga';
import resetPasswordSaga from './ResetPassword/saga';
import changePasswordSaga from './ChangePassword/saga';
import profileSaga from './Profile/saga';
import userSaga from './User/saga';
import chordSaga from './Chord/saga';
// import artistSaga from './Artist/saga';
import planSaga from './Plan/saga';
import lessonSaga from './Lesson/saga';
import songSaga from './Song/saga';

export default function* rootSaga(getState) {
  yield all([
    authSaga(),
    forgotPasswordSaga(),
    resetPasswordSaga(),
    changePasswordSaga(),
    profileSaga(),
    userSaga(),
    chordSaga(),
    // artistSaga(),
    planSaga(),
    lessonSaga(),
    songSaga()
  ]);
}
