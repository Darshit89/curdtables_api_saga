import React, { useEffect } from 'react';
import Layouts from '../../Components/Layouts';
import { Input, Button, Form, Divider, Upload, Icon, PageHeader } from 'antd';
import artistActions from '../../Redux/Artist/actions';
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

export const artistValidation = Yup.object().shape({
  name: Yup.string().required('Name is required.'),
  avatar: Yup.mixed()
  .required('Profile Picture is required')
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
  facebook_url: Yup.string().optional(),
  instagram_url: Yup.string().optional(),
  twitter_url: Yup.string().optional()
});


const CreateArtist = () => {
  const dispatch = useDispatch();
  const { action } = useSelector((state) => state.artist);

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const onCreateArtist = (values) => {
    dispatch(artistActions.createArtist(toFormData(values)));
  };

  useEffect(() => {
    if (action === artistActions.CREATE_ARTIST_SUCCESS) {
      history.goBack();
    }
  }, [action]);

  return (
    <Layouts title="assets" classname="grid">
      <div className="user-form">
        <PageHeader
          className="site-page-header"
          title="Create Artist"
        ></PageHeader>
        <Divider type="horizontal" />
        <Formik
          enableReinitialize
          initialValues={{
            name: '',
            avatar: null,
            facebook_url: '',
            instagram_url: '',
            twitter_url: ''
          }}
          validationSchema={artistValidation}
          onSubmit={onCreateArtist}
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
                <Form.Item label="Name" hasFeedback>
                  <Input
                    placeholder="Name"
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
                <Form.Item label="Profile picture" hasFeedback>
                  <Upload
                    customRequest={dummyRequest}
                    onRemove={() => {
                      setFieldValue('avatar', null);
                    }}
                    beforeUpload={(file) => setFieldValue('avatar', file)}
                    fileList={values.avatar ? [values.avatar] : []}
                    name="avatar"
                    access={file.SUPPORTED_IMAGE_FORMATS}
                    className={classnames('form-control', {
                      error: errors.avatar && touched.avatar
                    })}
                  >
                    <Button>
                      <Icon type="upload" /> Upload Profile picture
                    </Button>
                  </Upload>
                  <ErrorMessage
                    component="span"
                    className="error"
                    name="avatar"
                  />
                </Form.Item>
                <Form.Item label="Facebook Url" hasFeedback>
                  <Input
                    placeholder="Facebook profile Url"
                    name="facebook_url"
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Instagram Url" hasFeedback>
                  <Input
                    placeholder="Instagram profile Url"
                    name="instagram_url"
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Twitter Url" hasFeedback>
                  <Input
                    placeholder="Twitter profile Url"
                    name="twitter_url"
                    onChange={handleChange}
                  />  
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Create Artist
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

export default CreateArtist;

CreateArtist.propTypes = {
  artistValidation: PropTypes.object
};
