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
  Upload,
  Icon
} from 'antd';
import { history } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormat } from '../../Helpers/dateFormat';
import { Formik, ErrorMessage } from 'formik';
import { updateArtistValidation } from '../../Components/Validations';
import artistActions from '../../Redux/Artist/actions';
import classnames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import * as toFormData from 'to-formdata';
import * as queryString from 'query-string';
import { file } from '../../Helpers/file';

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

const ArtistList = () => {
  const dispatch = useDispatch();
  const { artistList } = useSelector((state) => state.artist);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [value, setValue] = useState('');
  const { isArtistModalVisible } = useSelector((state) => state.artist);
  const { selectedItem } = useSelector((state) => state.artist);

  const columns = [
    {
      title: <div className="header-style">Name</div>,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: <div className="header-style">Profile picture</div>,
      dataIndex: 'image_url',
      key: 'image_url',
      render: (text) => {
        return <img src={text} alt="logo" height="70px" width="70px" />;
      }
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
            onClick={() => showUpdateArtistModal(record)}
          ></Button>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure to delete Artist?"
            okText="Yes"
            key={2}
            cancelText="No"
            onConfirm={() => deleteArtist(record.id)}
          >
            <Button
              type="primary"
              shape="circle"
              icon="delete"
              size={'small'}
            />
          </Popconfirm>
        </span>
      )
    }
  ];

  const redirectToAddArtist = () => {
    history.push(`/artist/create`);
  };

  useEffect(() => {
    const queryParams = {
      page: 1
    };
    dispatch(artistActions.getArtistList(queryString.stringify(queryParams)));
  }, [dispatch]);

  const onChangePagination = (pagination) => {
    const queryParams = {
      page: pagination.current
    };
    dispatch(artistActions.getArtistList(queryString.stringify(queryParams)));
  };

  // to select multiple record for status active/Inactive
  const onChange = useCallback((selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  }, []);

  // change status
  const onChangeStatus = (value) => {
    const requestData = {
      ids: selectedRowKeys,
      status: parseInt(value)
    };
    dispatch(artistActions.artistChangeStatus(requestData));
    setSelectedRowKeys([]);
    setValue('');
  };

  // Delete Artist
  const deleteArtist = useCallback(
    (id) => {
      dispatch(artistActions.deleteArtist(id));
    },
    [dispatch]
  );

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  // Show modal popup for update chord
  const showUpdateArtistModal = (record) => {
    record.isArtistModalVisible = true;
    dispatch(artistActions.changeUpdateModalState(record));
  };

  // hide the popup modal when click on cancel
  const handleCancel = () => {
    dispatch(artistActions.changeUpdateModalState({ isArtistModalVisible: false }));
  };

  const onUpdateArtist = (values) => {
    let requestData = {
      name: values.name
    };
    if (values.new_avatar) {
      requestData.avatar = values.new_avatar;
    }
    requestData.id = values.id;
    requestData.facebook_url = values.facebook_url;
    requestData.instagram_url = values.instagram_url;
    requestData.twitter_url = values.twitter_url;
    dispatch(artistActions.updateArtist(toFormData(requestData)));
  };
  return (
    <Layouts title="assets" classname="grid">
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          className="site-page-header"
          title="Artists"
          extra={[
            <Button
              key="1"
              className="alignt-rignt"
              type="primary"
              onClick={redirectToAddArtist}
            >
              Add Artist
            </Button>
          ]}
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
          rowKey={(artist) => artist.id}
          pagination={{
            current: artistList?.pagination?.page || 1,
            total: artistList?.pagination?.rowCount || 1
          }}
          rowSelection={{
            selectedRowKeys,
            onChange
          }}
          columns={columns}
          dataSource={artistList?.payload}
          onChange={onChangePagination}
          scroll={{ x: 768 }}
        />

        {/** Update Artist Modal Popup */}
        <Modal
          title="Update Artist"
          visible={isArtistModalVisible}
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
                avatar: selectedItem?.avatar || '',
                new_avatar: null,
                facebook_url: selectedItem?.facebook_url || '',
                instagram_url: selectedItem?.instagram_url || '',
                twitter_url: selectedItem?.twitter_url || ''
              }}
              validationSchema={updateArtistValidation}
              onSubmit={onUpdateArtist}
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
                    layout="horizontal"
                    style={{ maxWidth: '600px' }}
                    {...formItemLayout}
                  >
                    <Form.Item label="Name" hasFeedback>
                      <Input
                        placeholder="Name"
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
                    <Form.Item label="Profile Picture">
                      <Upload
                        customRequest={dummyRequest}
                        onRemove={() => {
                          values.avatar
                            ? setFieldValue('avatar', null)
                            : setFieldValue('new_avatar', null);
                        }}
                        beforeUpload={(file) => {
                          setFieldValue('new_avatar', file);
                        }}
                        fileList={
                          values.new_avatar
                            ? [values.new_avatar]
                            : values.avatar
                              ? [values.avatar]
                              : []
                        }
                        access={file.SUPPORTED_IMAGE_FORMATS}
                        name={values.avatar ? 'avatar' : 'new_avatar'}
                      >
                        <Button>
                          <Icon type="upload" /> Upload Profile Picture
                        </Button>
                      </Upload>
                    </Form.Item>
                    <Form.Item label="Facebook Url" hasFeedback>
                      <Input
                        placeholder="Facebook profile Url"
                        name="facebook_url"
                        onChange={handleChange}
                        value={values.facebook_url}
                      />
                    </Form.Item>
                    <Form.Item label="Instagram Url" hasFeedback>
                      <Input
                        placeholder="Instagram profile Url"
                        name="instagram_url"
                        onChange={handleChange}
                        value={values.instagram_url}
                      />
                    </Form.Item>
                    <Form.Item label="Twitter Url" hasFeedback>
                      <Input
                        placeholder="Twitter profile Url"
                        name="twitter_url"
                        onChange={handleChange}
                        value={values.twitter_url}
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

export default ArtistList;

ArtistList.propTypes = {
  updateArtistValidation: PropTypes.object
};
