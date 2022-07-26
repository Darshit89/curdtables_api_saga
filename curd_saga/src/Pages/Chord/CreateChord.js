import React, { useEffect } from 'react';
import Layouts from '../../Components/Layouts';
import { Input, Button, Form, Divider, Upload, Icon, PageHeader } from 'antd';
import chordActions from '../../Redux/Chord/actions';
import { Formik, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../Redux/store';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import * as toFormData from 'to-formdata';
import * as Yup from 'yup';
import { file } from '../../Helpers/file';

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

export const chordValidation = Yup.object().shape({
  name: Yup.string().required('Title is required.'),
  image: Yup.mixed()
    .required('Image is required')
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
    .required('Audio file is required')
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

const CreateChord = () => {
  const dispatch = useDispatch();
  const { action } = useSelector((state) => state.chord);

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const onCreateChord = (values) => {
    dispatch(chordActions.createChord(toFormData(values)));
  };

  useEffect(() => {
    if (action === chordActions.CREATE_CHORD_SUCCESS) {
      history.goBack();
    }
  }, [action]);

  return (
    <Layouts title="assets" classname="grid">
      <div className="user-form">
      <PageHeader
          className="site-page-header"
          title="Create Chord"
        ></PageHeader>
        <Divider type="horizontal" />
        <Formik
          enableReinitialize
          initialValues={{
            name: '',
            image: null,
            audio_file: null
          }}
          validationSchema={chordValidation}
          onSubmit={onCreateChord}
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
                <Form.Item label="Title" hasFeedback>
                  <Input
                    placeholder="Chord title"
                    name="name"
                    onChange={handleChange}
                    className={classnames('form-control', {
                      error: errors.name && touched.name
                    })}
                  />
                  <ErrorMessage
                    component="span"
                    className="error"
                    name="name"
                  />
                </Form.Item>
                <Form.Item label="Image" hasFeedback>
                  <Upload
                    customRequest={dummyRequest}
                    onRemove={() => {
                      setFieldValue('image', null);
                    }}
                    beforeUpload={(file) => setFieldValue('image', file)}
                    fileList={values.image ? [values.image] : []}
                    name="image"
                    access={file.SUPPORTED_IMAGE_FORMATS}
                    className={classnames('form-control', {
                      error: errors.image && touched.image
                    })}
                  >
                    <Button>
                      <Icon type="upload" /> Upload Image
                    </Button>
                  </Upload>
                  <ErrorMessage
                    component="span"
                    className="error"
                    name="image"
                  />
                </Form.Item>
                <Form.Item label="Sound file" hasFeedback>
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
                      <Icon type="upload" /> Upload Sound File
                    </Button>
                  </Upload>
                  <ErrorMessage
                    component="span"
                    className="error"
                    name="audio_file"
                  />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Create Chord
                  </Button>
                </Form.Item>
              </Form>
            );
          }}
        />
      </div>
    </Layouts>
  );
};

export default CreateChord;

CreateChord.propTypes = {
  chordValidation: PropTypes.object
};
