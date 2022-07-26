import React, { useCallback} from 'react';
import { useDispatch } from 'react-redux';
import Layouts from '../Components/Layouts';
import { Form, Input, Icon, Button, PageHeader, Divider } from 'antd';
import profileActions from '../Redux/Profile/actions';
import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import {
  profileValidation,
  changePasswordValidation
} from '../Components/Validations';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import changePasswordActions from '../Redux/ChangePassword/actions';
import encodeString from '../Helpers/encode';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
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

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onChangeEmail = useCallback(
    (data, {resetForm} ) => {
      dispatch(profileActions.profile(data));
      resetForm();
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    (data, {resetForm}) => {
      dispatch(changePasswordActions.changePassword(encodeString(data)));
      resetForm();
    },
    [dispatch]
  );

  return (
    <Layouts title="assets" classname="grid">
      <div className="user-form">
        <PageHeader className="site-page-header" title="Profile"></PageHeader>
        <Divider type="horizontal" />
        <Formik
          enableReinitialize
          initialValues={{
            email: user?.email || ''
          }}
          validationSchema={profileValidation}
          onSubmit={onChangeEmail}
          render={({ handleSubmit, handleChange, errors, touched, values }) => {
            return (
              <Form
                onSubmit={handleSubmit}
                {...formItemLayout}
                layout="horizontal"
                style={{ maxWidth: '600px' }}
              >
                <Form.Item label="Email">
                  <Input
                    prefix={<Icon type="mail" />}
                    placeholder="Enter your email address"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className={classnames('form-control', {
                      error: errors.email && touched.email
                    })}
                  />
                  <ErrorMessage
                    component="span"
                    className="error"
                    name="email"
                  />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Change Email
                  </Button>
                </Form.Item>
              </Form>
            );
          }}
        />
        <Divider type="horizontal" />

        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            className="site-page-header"
            title="Change Password"
          ></PageHeader>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            current_password: '',
            new_password: '',
            confirm_password: ''
          }}
          validationSchema={changePasswordValidation}
          onSubmit={onChangePassword}
          render={({ handleSubmit, handleChange, errors, touched , values}) => {
            return (
              <Form
                onSubmit={handleSubmit}
                {...formItemLayout}
                layout="horizontal"
                style={{ maxWidth: '600px' }}
              >
                <Form.Item label="Current password">
                  <Input.Password
                    prefix={<Icon type="lock" />}
                    placeholder="Current password"
                    name="current_password"
                    onChange={handleChange}
                    value={values.current_password}
                    className={classnames('form-control', {
                      error: errors.current_password && touched.current_password
                    })}
                  />
                  <ErrorMessage
                    component="span"
                    className="error"
                    name="current_password"
                  />
                </Form.Item>
                <Form.Item label="New password">
                  <Input.Password
                    prefix={<Icon type="lock" />}
                    placeholder="New password"
                    name="new_password"
                    onChange={handleChange}
                    value={values.new_password}
                    className={classnames('form-control', {
                      error: errors.new_password && touched.new_password
                    })}
                  />
                  <ErrorMessage
                    component="span"
                    className="error"
                    name="new_password"
                  />
                </Form.Item>
                <Form.Item label="Confirm password">
                  <Input.Password
                    prefix={<Icon type="lock" />}
                    placeholder="Confirm password"
                    name="confirm_password"
                    onChange={handleChange}
                    value={values.confirm_password}
                    className={classnames('form-control', {
                      error: errors.confirm_password && touched.confirm_password
                    })}
                  />
                  <ErrorMessage
                    component="span"
                    className="error"
                    name="confirm_password"
                  />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Change Password
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

export default Profile;

Profile.propTypes = {
  profileValidation: PropTypes.object
};
