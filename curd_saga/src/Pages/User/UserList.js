import React, { useCallback, useEffect, useState } from 'react';
import Layouts from '../../Components/Layouts';
import {
  Table,
  Divider,
  Button,
  Popconfirm,
  Select,
  Tag,
  PageHeader,
  Modal,
  Form,
  Input,
  Icon
} from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import { updateUserValidation } from '../../Components/Validations';
import { dateFormat } from '../../Helpers/dateFormat';
import userActions from '../../Redux/User/actions';
import classnames from 'classnames';
import moment from 'moment';
import * as queryString from 'query-string';
import { history } from '../../Redux/store';
import encodeString from '../../Helpers/encode';

const { Option } = Select;

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

const UserList = () => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.user);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [value, setValue] = useState('');
  const { isUserModalVisible } = useSelector((state) => state.user);
  const { selectedItem } = useSelector((state) => state.user);

  useEffect(() => {
    const queryParams = {
      page: 1
    };
    dispatch(userActions.getUserList(queryString.stringify(queryParams)));
  }, [dispatch]);

  // Show modal popup for update chord
  const showUpdateUserModal = (record) => {
    record.isUserModalVisible = true;
    dispatch(userActions.changeUpdateModalState(record));
  };

  const columns = [
    {
      title: <div className="header-style">Registered No</div>,
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: <div className="header-style">User name</div>,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: <div className="header-style">Email address</div>,
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: <div className="header-style">Date of registration</div>,
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
            onClick={() => showUpdateUserModal(record)}
          ></Button>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure to delete User?"
            okText="Yes"
            key={2}
            cancelText="No"
            onConfirm={() => deleteUser(record.id)}
          >
            <Button
              type="primary"
              shape="circle"
              icon="delete"
              size={'small'}
            />
          </Popconfirm>
          <Divider type="vertical" />
          <Link to={`user/detail/${record.id}`}>
            <Button type="primary" shape="circle" icon="eye" size={'small'} />
          </Link>
        </span>
      )
    }
  ];

  // Delete user
  const deleteUser = useCallback(
    (id) => {
      dispatch(userActions.deleteUser(id));
    },
    [dispatch]
  );

  const onChangePagination = (pagination) => {
    const queryParams = {
      page: pagination.current
    };
    dispatch(userActions.getUserList(queryString.stringify(queryParams)));
  };

  // to select multiple record for status active/Inactive
  const onChange = useCallback((selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  }, []);

  // change status
  const changeStatus = (value) => {
    const requestData = {
      ids: selectedRowKeys,
      status: parseInt(value)
    };
    dispatch(userActions.changeStatus(requestData));
    setSelectedRowKeys([]);
    setValue('');
  };

  const redirectToAddUser = () => {
    history.push(`/user/create`);
  };

  const handleCancel = () => {
    dispatch(userActions.changeUpdateModalState({ isUserModalVisible: false }));
  };

  const onUpdateUser = useCallback(
    (values) => {
      let requestData = {
        id: values.id,
        name: values.name
      };
      if (values.password) {
        requestData.password = values.password;
      }
      dispatch(userActions.updateUser(encodeString(requestData)));
    },
    [dispatch]
  );

  return (
    <Layouts title="assets" classname="grid">
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          className="site-page-header"
          title="Users"
          extra={[
            <Button
              key="1"
              className="alignt-rignt"
              type="primary"
              onClick={redirectToAddUser}
            >
              Add User
            </Button>
          ]}
        ></PageHeader>
      </div>
      <div className="user-form">
        <Select
          className="m-b-15"
          value={value}
          onChange={changeStatus}
          disabled={!selectedRowKeys.length}
        >
          <Option value="">Select Status</Option>
          <Option value="0">Inactive</Option>
          <Option value="1">Active</Option>
        </Select>
        <Table
          rowKey={(user) => user.id}
          pagination={{
            current: userList?.pagination?.page || 1,
            total: userList?.pagination?.rowCount || 1
          }}
          rowSelection={{
            selectedRowKeys,
            onChange
          }}
          columns={columns}
          dataSource={userList?.payload}
          onChange={onChangePagination}
          scroll={{ x: 768 }}
        />

        {/** Update User Modal Popup */}
        <Modal
          title="Update User"
          visible={isUserModalVisible}
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
                password: ''
              }}
              validationSchema={updateUserValidation}
              onSubmit={onUpdateUser}
              render={({
                handleSubmit,
                handleChange,
                errors,
                touched,
                values
              }) => {
                return (
                  <Form
                    id="chord-editor-form"
                    onSubmit={handleSubmit}
                    layout="horizontal"
                    style={{ maxWidth: '600px' }}
                    {...formItemLayout}
                  >
                    <Form.Item label="Username" hasFeedback>
                      <Input
                        placeholder="Enter your Username"
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
                    <Form.Item label="Password" hasFeedback>
                        <Input.Password
                          prefix={<Icon type="lock" />}
                          placeholder="Password"
                          name="password"
                          onChange={handleChange}
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

export default UserList;
