import React, { useCallback, useEffect, useState } from 'react';
import Layouts from '../../Components/Layouts';
import {
  Button,
  Divider,
  Select,
  Tag,
  Popconfirm,
  Icon,
  Table,
  Modal,
  Form,
  Input,
  Upload,
  PageHeader
} from 'antd';
import chordActions from '../../Redux/Chord/actions';
import { useDispatch, useSelector } from 'react-redux';
import * as queryString from 'query-string';
import moment from 'moment';
import { dateFormat } from '../../Helpers/dateFormat';
import { Formik, ErrorMessage } from 'formik';
import { updateChordValidation } from '../../Components/Validations';
import classnames from 'classnames';
import { history } from '../../Redux/store';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';
import PropTypes from 'prop-types';
import * as toFormData from 'to-formdata';
import { file } from '../../Helpers/file';

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
const ChordList = () => {
  const dispatch = useDispatch();
  const { chordList } = useSelector((state) => state.chord);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [value, setValue] = useState('');
  const { isChordModalVisible } = useSelector((state) => state.chord);
  const { selectedItem } = useSelector((state) => state.chord);

  useEffect(() => {
    const queryParams = {
      page: 1
    };
    dispatch(chordActions.getChordList(queryString.stringify(queryParams)));
  }, [dispatch]);

  const columns = [
    {
      title: <div className="header-style">Title</div>,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: <div className="header-style">Image/card</div>,
      dataIndex: 'image_url',
      key: 'image_url',
      render: (text) => {
        return (
          <img src={text} alt="BigCo Inc. logo" height="70px" width="70px" />
        );
      }
    },
    {
      title: <div className="header-style">Sound file</div>,
      dataIndex: 'audio_url',
      key: 'audio_url',
      render: (text) => {
        return (
          <AudioPlayer
            src={text}
            style={{
              width: '150px'
            }}
            showJumpControls={false}
            customVolumeControls={[]}
            autoPlayAfterSrcChange={false}
          />
        );
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
            onClick={() => showUpdateChordModal(record)}
          ></Button>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure to delete Chord?"
            okText="Yes"
            key={2}
            cancelText="No"
            onConfirm={() => deleteChord(record.id)}
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

  // to select multiple record for status active/Inactive
  const onChange = useCallback((selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  }, []);

  const onChangePagination = (pagination) => {
    const queryParams = {
      page: pagination.current
    };
    dispatch(chordActions.getChordList(queryString.stringify(queryParams)));
  };

  // Delete Chord
  const deleteChord = useCallback(
    (id) => {
      dispatch(chordActions.deleteChord(id));
    },
    [dispatch]
  );

  // change status
  const onChangeStatus = (value) => {
    const requestData = {
      ids: selectedRowKeys,
      status: parseInt(value)
    };
    dispatch(chordActions.chordChangeStatus(requestData));
    setSelectedRowKeys([]);
    setValue('');
  };

  // Show modal popup for update chord
  const showUpdateChordModal = (record) => {
    record.isChordModalVisible = true;
    dispatch(chordActions.changeUpdateModalState(record));
  };

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const onUpdateChord = (values) => {
    let requestData = {
      name: values.name
    };
    if (values.new_image) {
      requestData.image = values.new_image;
    }
    if (values.new_audio_file) {
      requestData.audio_file = values.new_audio_file;
    }
    dispatch(chordActions.updateChord(toFormData(requestData), values.id));
  };

  const handleCancel = () => {
    dispatch(chordActions.changeUpdateModalState({ isChordModalVisible: false }));
  };

  const redirectToAddChord = () => {
    history.push(`/chord/create`);
  };

  return (
    <Layouts title="assets" classname="grid">
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          className="site-page-header"
          title="Chords"
          extra={[
            <Button
              key="1"
              className="alignt-rignt"
              type="primary"
              onClick={redirectToAddChord}
            >
              Add Chord
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
          rowKey={(chord) => chord.id}
          pagination={{
            current: chordList?.pagination?.page || 1,
            total: chordList?.pagination?.rowCount || 1
          }}
          rowSelection={{
            selectedRowKeys,
            onChange
          }}
          columns={columns}
          dataSource={chordList?.chords}
          onChange={onChangePagination}
          scroll={{ x: 768 }}
        />

        {/** Update Chord Modal Popup */}
        <Modal
          title="Update Chord"
          visible={isChordModalVisible}
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
                image: selectedItem?.image || '',
                audio_file: selectedItem?.audio_file || '',
                new_image: null,
                new_audio_file: null
              }}
              validationSchema={updateChordValidation}
              onSubmit={onUpdateChord}
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
                    <Form.Item label="Title" hasFeedback>
                      <Input
                        placeholder="Chord title"
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
                    <Form.Item label="Image">
                      <Upload
                        customRequest={dummyRequest}
                        onRemove={() => {
                          values.image
                            ? setFieldValue('image', null)
                            : setFieldValue('new_image', null);
                        }}
                        beforeUpload={(file) => {
                          setFieldValue('new_image', file);
                        }}
                        fileList={
                          values.new_image
                            ? [values.new_image]
                            : values.image
                              ? [values.image]
                              : []
                        }
                        access={file.SUPPORTED_IMAGE_FORMATS}
                        name={values.image ? 'image' : 'new_image'}
                        className={classnames('form-control', {
                          error: errors.image && touched.image
                        })}
                      >
                        <Button>
                          <Icon type="upload" /> Upload Image
                        </Button>
                      </Upload>
                    </Form.Item>
                    <Form.Item label="Sound file" hasFeedback>
                      <Upload
                        customRequest={dummyRequest}
                        onRemove={() => {
                          values.audio_file
                            ? setFieldValue('audio_file', null)
                            : setFieldValue('new_audio_file', null);
                        }}
                        beforeUpload={(file) => {
                          setFieldValue('new_audio_file', file);
                        }}
                        fileList={
                          values.new_audio_file
                            ? [values.new_audio_file]
                            : values.audio_file
                              ? [values.audio_file]
                              : []
                        }
                        access={file.SUPPORTED_AUDIO_FORMATS}
                        name={
                          values.audio_file ? 'audio_file' : 'new_audio_file'
                        }
                        className={classnames('form-control', {
                          error: errors.audio_file && touched.audio_file
                        })}
                      >
                        <Button>
                          <Icon type="upload" /> Upload Sound File
                        </Button>
                      </Upload>
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

export default ChordList;

ChordList.propTypes = {
  updateChordValidation: PropTypes.object
};
