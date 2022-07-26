import React, { useEffect } from 'react';
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
  updateSongValidation,
  playerChordValidation
} from '../../Components/Validations';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import * as toFormData from 'to-formdata';
import AudioPlayer from '../../Components/AudioPlayer/AudioPlayer';
import { file } from '../../Helpers/file';

const { Option } = Select;
const { TextArea } = Input;

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

const UpdateSong = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();

  const song = useSelector((state) => state.song);
  let {
    artistList,
    isSongModalVisible,
    chordList,
    selectedSongData,
    songResponse,
    modaldata
  } = song;

  // Get song details to prefill
  useEffect(() => {
    dispatch(songActions.getSongById(id));
  }, [dispatch, id]);

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

  // To update song details
  const onUpdateSong = (values) => {
    let requestData = {
      title: values.title,
      artist_id: values.artist_id,
      song_level: values.song_level,
      bpm: values.bpm,
      lyrics: values.lyrics
    };
    if (values.new_cover_image) {
      requestData.cover_image = values.new_cover_image;
    }
    if (values.new_audio_file) {
      requestData.audio_file = values.new_audio_file;
    }
    if (values.is_featured) {
      requestData.is_featured = 1;
    } else {
      requestData.is_featured = 0;
    }
    dispatch(songActions.updateSong(toFormData(requestData), values.id));
  };

  const handleCancel = () => {
    dispatch(songActions.changeUpdateModalState({ isSongModalVisible: false }));
  };

  // To Update Chord in player
  const onUpdateChordOnSong = (value) => {
    if(modaldata?.index === 0) {
      value.index = 0;
    }
    dispatch(songActions.addUpdateChord(value));
  };

  const deleteChord = () => {
    const deletedData = {
      song_id: id,
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
          title="Update Song"
        ></PageHeader>
        <Divider type="horizontal" />
        <Formik
          enableReinitialize
          initialValues={{
            id: songResponse?.id || '',
            title: songResponse?.title || '',
            cover_image: selectedSongData?.cover_image || null,
            audio_file: selectedSongData?.audio_file || null,
            artist_id: songResponse?.artist_id || undefined,
            song_level: songResponse?.song_level || undefined,
            bpm: songResponse?.bpm || '',
            lyrics: songResponse?.lyrics || '',
            is_featured: songResponse?.is_featured || false,
            new_cover_image: null,
            new_audio_file: null
          }}
          validationSchema={updateSongValidation}
          onSubmit={onUpdateSong}
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
                    value={values.title}
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
                      values.cover_image
                        ? setFieldValue('cover_image', null)
                        : setFieldValue('new_cover_image', null);
                    }}
                    beforeUpload={(file) => {
                      setFieldValue('new_cover_image', file);
                    }}
                    fileList={
                      values.new_cover_image
                        ? [values.new_cover_image]
                        : values.cover_image
                          ? [values.cover_image]
                          : []
                    }
                    access={file.SUPPORTED_IMAGE_FORMATS}
                    name={
                      values.cover_image ? 'cover_image' : 'new_cover_image'
                    }
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
                      values.audio_file
                        ? setFieldValue('audio_file', null)
                        : setFieldValue('new_audio_file', null);
                    }}
                    beforeUpload={(file) => {
                      setFieldValue('new_audio_file', file);
                    }}
                    fileList={
                      values.new_audio_file
                        ? [values.new_audio_file]
                        : values.audio_file
                          ? [values.audio_file]
                          : []
                    }
                    access={file.SUPPORTED_AUDIO_FORMATS}
                    name={values.audio_file ? 'audio_file' : 'new_audio_file'}
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
                    value={values.artist_id}
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
                    value={values.song_level}
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
                    value={values.bpm}
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
                    Update Song
                  </Button>
                </Form.Item>
              </Form>
            );
          }}
        />
        <Divider type="horizontal" />

        <AudioPlayer songResponse={songResponse} />
      </div>

      <Modal
        title="Update Chords"
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
        <Formik
          enableReinitialize
          initialValues={{
            song_id: id,
            chord_id: modaldata?.chordData?.chord_id || '',
            index: modaldata?.index || ''
          }}
          validationSchema={playerChordValidation}
          onSubmit={onUpdateChordOnSong}
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
                      onUpdateChordOnSong({
                        song_id: id,
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
                <Divider type="horizontal" />
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
                    onClick={() => deleteChord(values)}
                  >
                    Delete
                  </Button>}
                </Form.Item>
              </Form>
            );
          }}
        />
      </Modal>
    </Layouts>
  );
};

export default UpdateSong;

UpdateSong.propTypes = {
  updateSongValidation: PropTypes.object,
  playerChordValidation: PropTypes.object
};
