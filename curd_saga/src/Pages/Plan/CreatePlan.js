import React, { useCallback, useEffect } from 'react';
import Layouts from '../../Components/Layouts';
import { Input, Button, Form, Divider, Select, InputNumber, PageHeader } from 'antd';
import { Formik, ErrorMessage } from 'formik';
import { planValidation } from '../../Components/Validations';
import planActions from '../../Redux/Plan/actions';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../Redux/store';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const { Option } = Select;

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

const CreatePlan = () => {
  const dispatch = useDispatch();
  const { action } = useSelector((state) => state.plan);
  const { planDurationList } = useSelector((state) => state.plan);

  useEffect(() => {
    dispatch(planActions.getPlanDurationList());
  }, [dispatch]);

  const onCreatePlan = useCallback(
    (values) => {
      dispatch(planActions.createPlan(values));
    },
    [dispatch]
  );

  useEffect(() => {
    if (action === planActions.CREATE_PLAN_SUCCESS) {
      history.goBack();
    }
  }, [action]);

  return (
    <Layouts title="assets" classname="grid">
      <div className="user-form">
      <PageHeader
          className="site-page-header"
          title="Create Plan"
        ></PageHeader>
        <Divider type="horizontal" />
        <Formik
          enableReinitialize
          initialValues={{
            name: '',
            price: '',
            plan_type_id: ''
          }}
          validationSchema={planValidation}
          onSubmit={onCreatePlan}
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
                <Form.Item label="Plan title" hasFeedback>
                  <Input
                    placeholder="Enter plan name"
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
                <Form.Item label="Price" hasFeedback>
                  <InputNumber
                    style={{ width: '100%' }}
                    value={values.price}
                    placeholder="Add price of plan"
                    onChange={(data) => {
                      setFieldValue('price', data);
                    }}
                    className={classnames('form-control', {
                      error: errors.price && touched.price
                    })}
                  />
                  <ErrorMessage
                    component="span"
                    className="error"
                    name="price"
                  />
                </Form.Item>
                <Form.Item label="Duration" hasFeedback>
                  <Select
                    placeholder="Select Duration"
                    onChange={(value) => {
                      setFieldValue('plan_type_id', value);
                    }}
                    className={classnames('form-control', {
                      error: errors.plan_type_id && touched.plan_type_id
                    })}
                  >
                    {planDurationList.map((duration, index) => {
                      return (
                        <Option value={duration.id} key={index}>
                          {duration.name}
                        </Option>
                      );
                    })}
                  </Select>
                  <ErrorMessage
                    component="span"
                    className="error"
                    name="plan_type_id"
                  />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Create Plan
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

export default CreatePlan;

CreatePlan.propTypes = {
  planValidation: PropTypes.object
};
