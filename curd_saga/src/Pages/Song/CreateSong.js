import React, { useEffect, useState } from 'react';
import Layouts from '../../Components/Layouts';
import {
  Input,
  Button,
  Form,
  Divider,
  Upload,
  Icon,
  Select,
  InputNumber,
  Checkbox,
  Modal,
  PageHeader
} from 'antd';
import songActions from '../../Redux/Song/actions';
import { Formik, ErrorMessage } from 'formik';
import {
  playerChordValidation
} from '../../Components/Validations';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import actions from '../../Redux/Song/actions';
import * as toFormData from 'to-formdata';
import AudioPlayer from '../../Components/AudioPlayer/AudioPlayer';
import * as Yup from 'yup';
import { file } from '../../Helpers/file';

const { Option } = Select;
const { TextArea } = Input;

const songValidation = Yup.object().shape({
  title: Yup.string().required('Song Name is required.'),
  artist_id: Yup.string().required('Artist name is required'),
  song_level: Yup.string().required('Song level is required'),
  bpm: Yup.string().required('BPM is required'),
  lyrics: Yup.string().required('Lyrics is required.'),
  cover_image: Yup.mixed()
    .required('Cover Image is required')
    .test(
      'fileFormat',
      'Please check image type',
      (value) => value && file.SUPPORTED_IMAGE_FORMATS.includes(value.type)
    )
    .test(
      'fileSize',
      'Uploaded Image should be max. 5 MB',
      (value) => value && value.size <= file.IMAGE_FILE_SIZE
    ),
  audio_file: Yup.mixed()
    .required('Song file is required')
    .test(
      'fileFormat',
      'Please check file type',
      (value) => value && file.SUPPORTED_AUDIO_FORMATS.includes(value.type)
    )
    .test(
      'fileSize',
      'Uploaded file should be max. 10 MB',
      (value) => value && value.size <= file.AUDIO_FILE_SIZE
    )
});

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const CreateSong = () => {
  const dispatch = useDispatch();

  const song = useSelector((state) => state.song);
  let {
    action,
    artistList,
    isSongModalVisible,
    chordList,
    modaldata,
    songResponse
  } = song;

  const [showPlayer, setShowPlayer] = useState(false);

  // To get all Artist List
  useEffect(() => {
    dispatch(songActions.getArtistList());
  }, [dispatch]);

  // To get all chord List
  useEffect(() => {
    dispatch(songActions.getChordList());
  }, [dispatch]);

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  // To create song
  const onCreateSong = (values) => {
    if (values.is_featured) {
      values.is_featured = 1;
    } else {
      values.is_featured = 0;
    }
    dispatch(songActions.createSong(toFormData(values)));
  };

  useEffect(() => {
    if (action === actions.CREATE_SONG_SUCCESS) {
      setShowPlayer(true);
    }
  }, [action]);

  const handleCancel = () => {
    dispatch(songActions.changeUpdateModalState({ isSongModalVisible: false }));
  };

  // To add Chord in player
  const onAddChordOnSong = (values) => {
    if(modaldata?.index === 0) {
      values.index = 0;
    }
    dispatch(songActions.addUpdateChord(values));
  };

  const deleteChord = () => {
    const deletedData = {
      song_id: modaldata?.song_id,
      chord_id: modaldata?.chordData?.chord_id || '',
      index: modaldata?.index || ''
    };
    if(deletedData.index === '') {
      deletedData.index = 0;
    }
    dispatch(songActions.deleteChord(deletedData));
  };
  return (
    <Layouts title="assets" classname="grid">
      <div className="user-form">
        <PageHeader
          className="site-page-header"
          title="Create Song"
        ></PageHeader>
        <Divider type="horizontal" />
        <Formik
          enableReinitialize
          initialValues={{
            title: '',
            cover_image: null,
            audio_file: null,
            artist_id: undefined,
            song_level: undefined,
            bpm: '',
            lyrics: '',
            is_featured: false
          }}
          validationSchema={songValidation}
          onSubmit={onCreateSong}
          render={({
            handleSubmit,
            handleChange,
            setFieldValue,
            errors,
            touched,
            values
          }) => {
            return (
              <Form
                onSubmit={handleSubmit}
                {...formItemLayout}
                layout="horizontal"
                style={{ maxWidth: '600px' }}
              >
                <Form.Item label="Song Name" hasFeedback>
                  <Input
                    placeholder="Song Name/Title"
                    name="title"
                    onChange={handleChange}
                    className={classnames('form-control', {
                      error: errors.title && touched.title
                    })}
                  />
                  <ErrorMessage
                    component="span"
                    className="error"
                    name="title"
                  />
                </Form.Item>
                <Form.Item label="Cover Image" hasFeedback>
                  <Upload
                    customRequest={dummyRequest}
                    onRemove={() => {
                      setFieldValue('cover_image', null);
                    }}
                    beforeUpload={(file) => setFieldValue('cover_image', file)}
                    fileList={values.cover_image ? [values.cover_image] : []}
                    name="cover_image"
                    access={file.SUPPORTED_IMAGE_FORMATS}
                    className={classnames('form-control', {
                      error: errors.cover_image && touched.cover_image
                    })}
                  >
                    <Button>
                      <Icon type="upload" /> Upload Cover Image
                    </Button>
                  </Upload>
                  <ErrorMessage
                    component="span"
                    className="error"
                    name="cover_image"
                  />
                </Form.Item>
                <Form.Item label="Song" hasFeedback>
                  <Upload
                    customRequest={dummyRequest}
                    onRemove={() => {
                      setFieldValue('audio_file', null);
                    }}
                    beforeUpload={(file) => setFieldValue('audio_file', file)}
                    fileList={values.audio_file ? [values.audio_file] : []}
                    name="audio_file"
                    access={file.SUPPORTED_AUDIO_FORMATS}
                    className={classnames('form-control', {
                      error: errors.audio_file && touched.audio_file
                    })}
                  >
                    <Button>
                      <Icon type="upload" /> Upload Song
                    </Button>
                  </Upload>
                  <ErrorMessage
                    component="span"
                    className="error"
                    name="audio_file"
                  />
                </Form.Item>
                <Form.Item label="Artist name" hasFeedback>
                  <Select
                    className="m-b-15"
                    placeholder="Select artist name"
                    onChange={(value) => {
                      setFieldValue('artist_id', value);
                    }}
                    className={classnames('form-control', {
                      error: errors.artist_id && touched.artist_id
                    })}
                  >
                    {artistList.map((artist, index) => {
                      return (
                        <Option value={artist.id} key={index}>
                          {artist.name}
                        </Option>
                      );
                    })}
                  </Select>
                  <ErrorMessage
                    component="span"
                    className="error"
                    name="artist_id"
                  />
                </Form.Item>
                <Form.Item label="Song level" hasFeedback>
                  <Select
                    className="m-b-15"
                    placeholder="Select Song level"
                    onChange={(value) => {
                      setFieldValue('song_level', value);
                    }}
                    className={classnames('form-control', {
                      error: errors.song_level && touched.song_level
                    })}
                  >
                    <Option value="1">Easy</Option>
                    <Option value="2">Medium</Option>
                    <Option value="3">Difficult</Option>
                  </Select>
                  <ErrorMessage
                    component="span"
                    className="error"
                    name="song_level"
                  />
                </Form.Item>
                <Form.Item label="BPM" hasFeedback>
                  <InputNumber
                    style={{ width: '100%' }}
                    placeholder="Add BPM"
                    onChange={(data) => {
                      setFieldValue('bpm', data);
                    }}
                    className={classnames('form-control', {
                      error: errors.bpm && touched.bpm
                    })}
                  />
                  <ErrorMessage component="span" className="error" name="bpm" />
                </Form.Item>
                <Form.Item label="Lyrics">
                  <TextArea
                    value={values.lyrics}
                    rows={4}
                    placeholder="Provide Lyrics"
                    name="lyrics"
                    onChange={handleChange}
                    className={classnames('form-control', {
                      error: errors.lyrics && touched.lyrics
                    })}
                  />
                  <ErrorMessage
                    component="span"
                    className="error"
                    name="lyrics"
                  />
                </Form.Item>
                <Form.Item style={{ textAlign: 'center' }}>
                  <Checkbox
                    name="is_featured"
                    checked={values.is_featured}
                    onChange={handleChange}
                  >
                    Mark as Featured Song
                  </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Create Song
                  </Button>
                </Form.Item>
              </Form>
            );
          }}
        />

        {showPlayer && <AudioPlayer songResponse={songResponse} />}
      </div>

      {
        <Modal
          title="Add Chords"
          visible={isSongModalVisible}
          okButtonProps={{
            form: 'chord-editor-form',
            key: 'submit',
            htmlType: 'submit'
          }}
          destroyOnClose={true}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="user-form modal-popup">
            <Formik
              enableReinitialize
              initialValues={{
                song_id: modaldata?.song_id || '',
                chord_id: modaldata?.chordData?.chord_id || '',
                index: modaldata.index || ''
              }}
              validationSchema={playerChordValidation}
              onSubmit={onAddChordOnSong}
              render={({
                handleSubmit,
                handleChange,
                setFieldValue,
                errors,
                touched,
                values
              }) => {
                return (
                  <Form
                    id="chord-editor-form"
                    onSubmit={handleSubmit}
                    {...formItemLayout}
                    layout="horizontal"
                    style={{ maxWidth: '600px' }}
                  >
                    <Form.Item label="Select chord" hasFeedback>
                      <Select
                        autoFocus={true}
                        showSearch={true}
                        optionFilterProp="children"
                        placeholder="Select Chord"
                        value={values.chord_id}
                        onChange={(value) => {
                          setFieldValue('chord_id', value);
                          onAddChordOnSong({
                            song_id: modaldata?.song_id | 's',
                            chord_id: value || '',
                            index: modaldata?.index || ''
                          })
                        }}
                        className={classnames('form-control', {
                          error: errors.chord_id && touched.chord_id
                        })}
                      >
                        {chordList.map((chord, index) => {
                          return (
                            <Option value={chord.id} key={index}>
                              {chord.name}
                            </Option>
                          );
                        })}
                      </Select>
                      <ErrorMessage
                        component="span"
                        className="error"
                        name="chord_id"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="alignt-rignt"
                      >
                        Save
                      </Button>
                      {modaldata?.chordData?.chord_id && <Button
                        type="primary"
                        className="alignt-rignt m-r-20 "
                        onClick={() => deleteChord()}
                      >
                        Delete
                      </Button>}
                    </Form.Item>
                  </Form>
                );
              }}
            />
          </div>
        </Modal>
      }
    </Layouts>
  );
};

export default CreateSong;

CreateSong.propTypes = {
  songValidation: PropTypes.object,
  playerChordValidation: PropTypes.object
};
