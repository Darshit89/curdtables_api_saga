import React, { useCallback, useEffect, useState } from 'react';
import Layouts from '../../Components/Layouts';
import {
  PageHeader,
  Button,
  Select,
  Table,
  Tag,
  Divider,
  Popconfirm,
  Modal,
  Form,
  Input,
  InputNumber
} from 'antd';
import planActions from '../../Redux/Plan/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as queryString from 'query-string';
import moment from 'moment';
import { dateFormat } from '../../Helpers/dateFormat';
import { Formik, ErrorMessage } from 'formik';
import { planValidation } from '../../Components/Validations';
import classnames from 'classnames';
import { history } from '../../Redux/store';
import PropTypes from 'prop-types';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const PlanList = () => {
  const dispatch = useDispatch();
  const { planList } = useSelector((state) => state.plan);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [value, setValue] = useState('');
  const { isPlanModalVisible } = useSelector((state) => state.plan);
  const { selectedItem } = useSelector((state) => state.plan);
  const { planDurationList } = useSelector((state) => state.plan);

  // To get Plan duration in edit plan modal popup
  useEffect(() => {
    dispatch(planActions.getPlanDurationList());
  }, [dispatch]);

  useEffect(() => {
    const queryParams = {
      page: 1
    };
    dispatch(planActions.getPlanList(queryString.stringify(queryParams)));
  }, [dispatch]);

  const columns = [
    {
      title: <div className="header-style">Title</div>,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: <div className="header-style">Price</div>,
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: <div className="header-style">Duration</div>,
      dataIndex: "planType['name']",
      key: "planType['name']"
    },
    {
      title: <div className="header-style">Created Date</div>,
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => {
        return moment(text, dateFormat.databaseDateFormat).format(
          dateFormat.commonListDateFormat
        );
      }
    },
    {
      title: <div className="header-style">Status</div>,
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        let status = '';
        switch (text) {
          case 0:
            status = <Tag color="red">Inactive</Tag>;
            break;
          case 1:
            status = <Tag color="green">Active</Tag>;
            break;
          case 2:
            status = <Tag color="blue">Not verified</Tag>;
            break;
          default:
            status = <Tag color="gold">Undefined</Tag>;
        }
        return status;
      }
    },
    {
      title: <div className="header-style">Action</div>,
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            shape="circle"
            icon="edit"
            size={'small'}
            onClick={() => showUpdatePlanModal(record)}
          ></Button>
        </span>
      )
    }
  ];

  // to select multiple record for status active/Inactive
  const onChange = useCallback((selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  }, []);

  const onChangePagination = (pagination) => {
    const queryParams = {
      page: pagination.current
    };
    dispatch(planActions.getPlanList(queryString.stringify(queryParams)));
  };

  // change status
  const onChangeStatus = (value) => {
    const requestData = {
      ids: selectedRowKeys,
      status: parseInt(value)
    };
    dispatch(planActions.planChangeStatus(requestData));
    setSelectedRowKeys([]);
    setValue('');
  };

  // Show modal popup for update Plan
  const showUpdatePlanModal = (record) => {
    record.isPlanModalVisible = true;
    dispatch(planActions.changeUpdateModalState(record));
  };

  const onUpdatePlan = (values) => {
    dispatch(planActions.updatePlan(values));
  };

  const handleCancel = () => {
    dispatch(planActions.changeUpdateModalState({ isPlanModalVisible: false }));
  };
  return (
    <Layouts title="assets" classname="grid">
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          className="site-page-header"
          title="Plans"
        ></PageHeader>
      </div>
      <div className="user-form">
        <Select
          className="m-b-15"
          value={value}
          onChange={onChangeStatus}
          disabled={!selectedRowKeys.length}
        >
          <Option value="">Select Status</Option>
          <Option value="0">Inactive</Option>
          <Option value="1">Active</Option>
        </Select>
        <Table
          rowKey={(plan) => plan.id}
          pagination={{
            current: planList?.pagination?.page || 1,
            total: planList?.pagination?.rowCount || 1
          }}
          rowSelection={{
            selectedRowKeys,
            onChange
          }}
          columns={columns}
          dataSource={planList?.payload}
          onChange={onChangePagination}
          scroll={{ x: 768 }}
        />

        {/** Update Plan Modal Popup */}
        <Modal
          title="Update Plan"
          visible={isPlanModalVisible}
          okButtonProps={{
            form: 'chord-editor-form',
            key: 'submit',
            htmlType: 'submit'
          }}
          destroyOnClose={true}
          onCancel={handleCancel}
          className="modal-width"
        >
          <div className="user-form">
            <Formik
              enableReinitialize
              initialValues={{
                id: selectedItem?.id || '',
                name: selectedItem?.name || '',
                price: selectedItem?.price || '',
                plan_type_id: selectedItem?.plan_type_id || ''
              }}
              validationSchema={planValidation}
              onSubmit={onUpdatePlan}
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
                    <Form.Item label="Plan title" hasFeedback>
                      <Input
                        placeholder="Enter plan name"
                        name="name"
                        onChange={handleChange}
                        value={values.name}
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
                        value={values.plan_type_id}
                        placeholder="Select Duration"
                        onChange={(value) => {
                          setFieldValue('plan_type_id', value);
                        }}
                        disabled
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
                  </Form>
                );
              }}
            />
          </div>
        </Modal>
      </div>
    </Layouts>
  );
};

export default PlanList;

PlanList.propTypes = {
  planValidation: PropTypes.object
};
