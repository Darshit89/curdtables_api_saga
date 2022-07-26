import React, { useCallback, useEffect, useMemo } from 'react';
import Layouts from '../../Components/Layouts';
import {
  Divider,
  Tag,
  Button,
  Card,
  Popconfirm,
  Table,
  PageHeader,
  Modal,
  Form,
  Input,
  Descriptions
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import lessonAction from '../../Redux/Lesson/actions';
import moment from 'moment';
import PropTypes from 'prop-types';
import { dateFormat } from '../../Helpers/dateFormat';
import * as queryString from 'query-string';
import lessonActions from '../../Redux/Lesson/actions';
import { Formik, ErrorMessage } from 'formik';
import { videoStepValidation } from '../../Components/Validations';
import classnames from 'classnames';

const DetailLesson = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const lesson = useSelector((state) => state.lesson);
  let { lessonData, subLessonData, isLessonModalVisible, selectedItem } = lesson;

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

  const columns = [
    {
      title: <div className="header-style">Sequence</div>,
      dataIndex: 'sequence',
      key: 'sequence'
    },
    {
      title: <div className="header-style">Video title/name</div>,
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: <div className="header-style">Video Link</div>,
      dataIndex: 'video_file',
      key: 'video_file',
      render: (text) => {
        return (
          <a target="_blank" href={text} rel="noopener noreferrer">
            {text}
          </a>
        );
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
            onClick={() => showUpdateVideoModal(record)}
          ></Button>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure to delete Sub-lesson?"
            okText="Yes"
            key={2}
            cancelText="No"
            onConfirm={() => deleteSingleVideo(record.id)}
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

  useEffect(() => {
    dispatch(lessonAction.getLessonById(id));
    const queryParams = {
      page: 1
    };
    dispatch(
      lessonAction.getSubLessonById(id, queryString.stringify(queryParams))
    );
  }, [dispatch, id]);

  const onChangePagination = (pagination) => {
    const queryParams = {
      page: pagination.current
    };
    dispatch(
      lessonAction.getSubLessonById(id, queryString.stringify(queryParams))
    );
  };

  // Show modal popup for update videos
  const showUpdateVideoModal = (record) => {
    record.isLessonModalVisible = true;
    dispatch(lessonActions.changeUpdateModalState(record));
  };

  const handleCancel = () => {
    dispatch(lessonActions.changeUpdateModalState({ isLessonModalVisible: false }));
  };

  const editSingleVideo = useCallback(
    (record) => {
      delete record.sequence;
      dispatch(lessonActions.editSingleVideo(record));
    },
    [dispatch]
  );

  const deleteSingleVideo = useCallback(
    (subLessonId) => {
      dispatch(lessonActions.deleteSingleVideo(subLessonId));
    },
    [dispatch]
  );

  const lessonStatus = useMemo(() => {
    let status = lessonData?.status;
    switch (status) {
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
  }, [lessonData]);
  return (
    <Layouts title="assets" classname="grid">
      <div className="user-form">
        <PageHeader
          className="site-page-header"
          title="Details of Lesson"
        ></PageHeader>
        <Divider type="horizontal" />
        <Descriptions>
          <Descriptions.Item label="Lesson name/title">
            {lessonData?.title}
          </Descriptions.Item>
          <Descriptions.Item label="Lesson description">
            {lessonData?.description}
          </Descriptions.Item>
          <Descriptions.Item label="Created Date">
            {moment(
              lessonData?.created_at,
              dateFormat.databaseDateFormat
            ).format(dateFormat.commonListDateFormat)}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{lessonStatus}</Descriptions.Item>
        </Descriptions>
        <div className="site-card-border-less-wrapper">
          <Card title="Videos">
            <Table
              rowKey={(subLesson) => subLesson.sequence}
              pagination={{
                current: subLessonData?.pagination?.page || 1,
                total: subLessonData?.pagination?.rowCount || 1
              }}
              columns={columns}
              dataSource={subLessonData?.payload}
              onChange={onChangePagination}
              scroll={{ x: 768 }}
            />
          </Card>
        </div>

        <Modal
          title="Update Video"
          visible={isLessonModalVisible}
          okButtonProps={{
            form: 'chord-editor-form',
            key: 'submit',
            htmlType: 'submit'
          }}
          destroyOnClose={true}
          onCancel={handleCancel}
        >
          <div className="user-form">
            <Formik
              enableReinitialize
              initialValues={{
                id: selectedItem.id || '',
                sequence: selectedItem.sequence || '',
                title: selectedItem.title || '',
                video_file: selectedItem.video_file || ''
              }}
              validationSchema={videoStepValidation}
              onSubmit={editSingleVideo}
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
                    <Form.Item label="Title/name" hasFeedback>
                      <Input
                        placeholder="Enter video title/name"
                        name="title"
                        onChange={handleChange}
                        value={values.title}
                        className={classnames('form-control', {
                          error: errors.title && touched.title
                        })}
                      />
                      <ErrorMessage
                        component="span"
                        className="error"
                        name="title"
                      />
                    </Form.Item>
                    <Form.Item label="Embedded video url" hasFeedback>
                      <Input
                        placeholder="Enter Embedded video url"
                        name="video_file"
                        onChange={handleChange}
                        value={values.video_file}
                        className={classnames('form-control', {
                          error: errors.video_file && touched.video_file
                        })}
                      />
                      <ErrorMessage
                        component="span"
                        className="error"
                        name="video_file"
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

export default DetailLesson;

DetailLesson.propTypes = {
  match: PropTypes.object
};
