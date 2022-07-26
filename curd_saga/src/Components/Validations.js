import * as Yup from 'yup';

export const userValidation = Yup.object().shape({
  name: Yup.string().required('Username is required.'),
  email: Yup.string().label('Email').email().required('Email address is required.')
});

export const loginValidation = Yup.object().shape({
  email: Yup.string().label('Email').email().required('Email address is required.'),
  password: Yup.string().required('Password is required')
});

export const forgotPasswordValidation = Yup.object().shape({
  email: Yup.string().label('Email').email().required('Email address is required.')
});

export const resetPasswordValidation = Yup.object().shape({
  new_password: Yup.string()
    .label('New Password')
    .required('Password is required')
    .min(8),
  confirm_password: Yup.string()
    .oneOf(
      [Yup.ref('new_password'), null],
      'Password must match with new password'
    )
    .required('Confirm password is required')
});

export const changePasswordValidation = Yup.object().shape({
  current_password: Yup.string()
    .label('Current password')
    .required('Current password is required'),
  new_password: Yup.string()
    .label('New password')
    .required('New password is required')
    .min(8),
  confirm_password: Yup.string()
    .oneOf(
      [Yup.ref('new_password'), null],
      'Password must match with new password'
    )
    .required('Confirm Password is required')
});

export const profileValidation = Yup.object().shape({
  email: Yup.string().label('Email').email().required('Email address is required.')
});

export const updateUserValidation = Yup.object().shape({
  name: Yup.string().required('Username is required.'),
  password: Yup.string().optional()
});

export const updateArtistValidation = Yup.object().shape({
  name: Yup.string().required('Name is required.'),
  avatar: Yup.mixed().optional(),
  new_avatar: Yup.mixed().optional(),
  facebook_url: Yup.string().optional(),
  instagram_url: Yup.string().optional(),
  twitter_url: Yup.string().optional()
});

export const updateChordValidation = Yup.object().shape({
  name: Yup.string().required('Title is required.'),
  image: Yup.mixed().optional(),
  new_image: Yup.mixed().optional(),
  audio_file: Yup.mixed().optional(),
  new_audio_file: Yup.mixed().optional()
});

export const updateSongValidation = Yup.object().shape({
  title: Yup.string().required('Song Name is required.'),
  artist_id: Yup.string().required('Artist name is required'),
  song_level: Yup.string().required('Song level is required'),
  bpm: Yup.string().required('BPM is required'),
  lyrics: Yup.string().required('Lyrics is required.'),
  cover_image: Yup.mixed().optional(),
  audio_file: Yup.mixed().optional(),
  new_cover_image: Yup.mixed().optional(),
  new_audio_file: Yup.mixed().optional()
});

export const planValidation = Yup.object().shape({
  name: Yup.string().required('Plan Title is required.'),
  price: Yup.number().label('Price').required('Price is required.').positive().integer(),
  plan_type_id:  Yup.string().required('Duration is required.')
});


export const lessonStepValidation = Yup.object().shape({
  title: Yup.string().required('Lesson name is required.'),
  description: Yup.string().max(300, 'Can not be more than 300 characters.').required('Description is required.'),
  thumbnail_image: Yup.mixed().optional(),
});

export const videoStepValidation = Yup.object().shape({
  title: Yup.string().required('Title is required.'),
  video_file: Yup.string().label('Video url').url().required('Video url is required.')
});
 
export const playerChordValidation = Yup.object().shape({
  chord_id: Yup.string().required('Chord is required')
});
