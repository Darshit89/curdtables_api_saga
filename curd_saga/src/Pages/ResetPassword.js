import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import logo from '../Static/images/Accompany_logo.svg';
import LayoutLogin from '../Components/LayoutLogin';
import { Form, Icon, Input, Button } from 'antd';
import resetPasswordActions from '../Redux/ResetPassword/actions';
import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import { resetPasswordValidation } from '../Components/Validations';
import encodeString from '../Helpers/encode';
import classnames from 'classnames';

const ResetPassword = ({ match }) => {
  const { token } = match.params;
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (data) => {
      dispatch(resetPasswordActions.resetPassword(encodeString(data), token));
    },
    [dispatch, token]
  );

  return (
    <LayoutLogin title="assets" classname="login">
      <div className="d-flex alignr-items-center justify-content-center flex-column set-layout">
        <div className="text-center">
          <img src={logo} alt="Logo" />
          <h1 className="m-b-30 m-t-15">Reset Password</h1>
          <div className="auth-form">
            <Formik
              enableReinitialize
              initialValues={{
                new_password: '',
                confirm_password: ''
              }}
              validationSchema={resetPasswordValidation}
              onSubmit={handleSubmit}
              render={({ handleSubmit, handleChange, errors, touched }) => {
                return (
                  <Form onSubmit={handleSubmit} layout="horizontal">
                    <Form.Item>
                      <Input.Password
                        prefix={<Icon type="lock" />}
                        placeholder="New password"
                        name="new_password"
                        onChange={handleChange}
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
                    <Form.Item>
                      <Input.Password
                        prefix={<Icon type="lock" />}
                        placeholder="Confirm password"
                        name="confirm_password"
                        onChange={handleChange}
                        className={classnames('form-control', {
                          error:
                            errors.confirm_password && touched.confirm_password
                        })}
                      />
                      <ErrorMessage
                        component="span"
                        className="error"
                        name="confirm_password"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="btn-block m-t-15"
                        size="large"
                      >
                        Reset Password
                      </Button>
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

export default ResetPassword;
ResetPassword.propTypes = {
  resetPasswordValidation: PropTypes.object,
  match: PropTypes.object
};
