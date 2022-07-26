import React, { useCallback } from 'react';
import { Input, Form, Modal } from 'antd';
import { Formik, ErrorMessage } from 'formik';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import lessonActions from '../../Redux/Lesson/actions';
import { videoStepValidation } from '../../Components/Validations';
import PropTypes from 'prop-types';

const ModalPopup = ({ isEditVideoModal, isLessonModalVisible }) => {
  const dispatch = useDispatch();
  const lesson = useSelector((state) => state.lesson);
  let { selectedItem, sequence, videos } = lesson;

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

  const handleCancel = () => {
    dispatch(lessonActions.changeUpdateModalState({ isLessonModalVisible: false }));
  };

  // Update videos data in redux
  const onUpdateVideos = useCallback(
    (data) => {
      dispatch(lessonActions.updateVideoData(data));
    },
    [dispatch]
  );

  // to add videos data in redux
  const onAddVideos = useCallback(
    (data) => {
      if (!videos.length) {
        data.sequence = sequence + 1;
      } else {
        data.sequence = videos.length + 1;
      }
      dispatch(lessonActions.addVideoData(data));
    },
    [dispatch, sequence, videos.length]
  );

  return (
    <Modal
      title={isEditVideoModal ? 'Update Video' : 'Add Video'}
      visible={isLessonModalVisible}
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
            id: selectedItem.id || '',
            sequence: selectedItem.sequence || '',
            title: selectedItem.title || '',
            video_file: selectedItem.video_file || ''
          }}
          validationSchema={videoStepValidation}
          onSubmit={isEditVideoModal ? onUpdateVideos : onAddVideos}
          render={({ handleSubmit, handleChange, errors, touched, values }) => {
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
  );
};
export default ModalPopup;

ModalPopup.prototypes = {
  isEditVideoModal : PropTypes.bool,
  isLessonModalVisible: PropTypes.bool
}

