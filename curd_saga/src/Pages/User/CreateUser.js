import React, { useCallback, useEffect } from 'react';
import Layouts from '../../Components/Layouts';
import { Input, Button, Form, Divider, PageHeader } from 'antd';
import { Formik, ErrorMessage } from 'formik';
import { userValidation } from '../../Components/Validations';
import userActions from '../../Redux/User/actions';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../Redux/store';
import classnames from 'classnames';
import PropTypes from 'prop-types';

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

const CreateUser = () => {
  const dispatch = useDispatch();
  const { action } = useSelector((state) => state.user);

  const onCreateUser = useCallback(
    (values) => {
      dispatch(userActions.createUser(values));
    },
    [dispatch]
  );

  useEffect(() => {
    if (action === userActions.CREATE_USER_SUCCESS) {
      history.goBack();
    }
  }, [action]);

  return (
    <Layouts title="assets" classname="grid">
      <div className="user-form">
      <PageHeader
          className="site-page-header"
          title="Create User"
        ></PageHeader>
        <Divider type="horizontal" />
        <Formik
          enableReinitialize
          initialValues={{
            name: '',
            email: ''
          }}
          validationSchema={userValidation}
          onSubmit={onCreateUser}
          render={({ handleSubmit, handleChange, errors, touched, values }) => {
            return (
              <Form
                onSubmit={handleSubmit}
                {...formItemLayout}
                layout="horizontal"
                style={{ maxWidth: '600px' }}
              >
                <Form.Item label="Username" hasFeedback>
                  <Input
                    placeholder="Enter your Username"
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
                <Form.Item label="Email Address" hasFeedback>
                  <Input
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
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Create User
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

export default CreateUser;

CreateUser.propTypes = {
  userValidation: PropTypes.object
};
