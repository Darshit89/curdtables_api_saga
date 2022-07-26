/** Import and export reducers from here */

import auth from './Auth/reducer';
import forgotPassword from './ForgotPassword/reducer';
import resetPassword from './ResetPassword/reducer';
import changePassword from './ChangePassword/reducer';
import profile from './Profile/reducer';
import user from './User/reducer';
import chord from './Chord/reducer';
import artist from './Artist/reducer';
import song from './Song/reducer';
import plan from './Plan/reducer';
import lesson from './Lesson/reducer';

export default {
  auth,
  forgotPassword,
  resetPassword,
  changePassword,
  profile,
  user,
  chord,
  artist,
  song,
  plan,
  lesson
};
