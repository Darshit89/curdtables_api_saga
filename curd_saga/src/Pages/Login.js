import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import logo from '../Static/images/Accompany_logo.svg';
import LayoutLogin from '../Components/LayoutLogin';
import authActions from '../Redux/Auth/actions';
import encodeString from '../Helpers/encode';
import PropTypes from 'prop-types';
import { Icon, Input, Button, Form } from 'antd';
import { Formik, ErrorMessage } from 'formik';
import { loginValidation } from '../Components/Validations';
import classnames from 'classnames';

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (data) => {
      dispatch(authActions.login(encodeString(data)));
    },
    [dispatch]
  );

  return (
    <LayoutLogin title="assets" classname="login">
      <div className="d-flex alignr-items-center justify-content-center flex-column set-layout">
        <div className="text-center">
          <img src={logo} alt="Logo" />
          <h1 className="m-b-30 m-t-15">Login</h1>
          <div className="auth-form">
            <Formik
              enableReinitialize
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={loginValidation}
              onSubmit={handleSubmit}
              render={({ handleSubmit, handleChange, errors, touched }) => {
                return (
                  <Form onSubmit={handleSubmit} layout="horizontal">
                    <Form.Item>
                      <Input
                        prefix={<Icon type="mail" />}
                        placeholder="Enter your email address"
                        name="email"
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
                      <Input.Password
                        prefix={<Icon type="lock" />}
                        placeholder="Enter your password"
                        name="password"
                        onChange={handleChange}
                        className={classnames('form-control', {
                          error: errors.password && touched.password
                        })}
                      />
                      <ErrorMessage
                        component="span"
                        className="error"
                        name="password"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="btn-block m-t-15"
                        size="large"
                      >
                        Login
                      </Button>
                      <span  className="forget-password">
                        <a href="/forgot-password">
                          Forgot password
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

export default Login;

Login.propTypes = {
  loginValidation: PropTypes.object
};
