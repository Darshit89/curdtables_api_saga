import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import logo from '../Static/images/Accompany_logo.svg';
import LayoutLogin from '../Components/LayoutLogin';
import { Form, Icon, Input, Button } from 'antd';
import forgotPasswordActions from '../Redux/ForgotPassword/actions';
import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import { forgotPasswordValidation } from '../Components/Validations';
import classnames from 'classnames';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (data, { resetForm }) => {
      dispatch(forgotPasswordActions.forgotPassword(data));
      resetForm();
    },
    [dispatch]
  );

  return (
    <LayoutLogin title="assets" classname="login">
      <div className="d-flex alignr-items-center justify-content-center flex-column set-layout">
        <div className="text-center">
          <img src={logo} alt="Logo" />
          <h1 className="m-b-30 m-t-15">Forgot Password</h1>
          <div className="auth-form">
            <Formik
              enableReinitialize
              initialValues={{
                email: ''
              }}
              validationSchema={forgotPasswordValidation}
              onSubmit={handleSubmit}
              render={({ handleSubmit, handleChange, errors, touched, values}) => {
                return (
                  <Form onSubmit={handleSubmit} layout="horizontal">
                    <Form.Item>
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
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="btn-block m-t-15"
                        size="large"
                      >
                        Send Password
                      </Button>
                      <span className="forget-password">
                        <a className="m-l-5" href="/">
                          Back to Log in
                        </a>
                      </span>
                    </Form.Item>
                  </Form>
                );
              }}
            />
          </div>
        </div>
      </div>
    </LayoutLogin>
  );
};

export default ForgotPassword;
ForgotPassword.propTypes = {
  forgotPasswordValidation: PropTypes.object
};
