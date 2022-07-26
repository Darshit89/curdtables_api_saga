import React, { useCallback, useRef } from 'react';
import { Input, Button, Form, Upload, Icon } from 'antd';
import { Formik, ErrorMessage } from 'formik';
import classnames from 'classnames';
import { lessonStepValidation } from '../../../Components/Validations';
import lessonActions from '../../../Redux/Lesson/actions';
import { useDispatch, useSelector } from 'react-redux';
import Buttons from '../Buttons';
import PropTypes from 'prop-types';

const { TextArea } = Input;

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

const LessonStep = ({ onNextClick }) => {
  const dispatch = useDispatch();
  const formRef = useRef();

  let { title, description, thumbnail_image } = useSelector(
    (state) => state.lesson
  );

  const onSubmitLesson = useCallback(
    (data) => {
      let requestData = {
        title: data.title,
        description: data.description
      };
      if (data.new_thumbnail_image) {
        requestData.thumbnail_image = data.new_thumbnail_image;
      }
      dispatch(lessonActions.saveLessonData(requestData));
      onNextClick();
    },
    [dispatch, onNextClick]
  );

  const handleNextClick = useCallback(() => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  }, [formRef]);

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  return (
    <Formik
      enableReinitialize
      innerRef={formRef}
      initialValues={{
        title: title || '',
        description: description || '',
        thumbnail_image: thumbnail_image || '',
        new_thumbnail_image: null
      }}
      validationSchema={lessonStepValidation}
      onSubmit={onSubmitLesson}
      render={({
        handleSubmit,
        handleChange,
        setFieldValue,
        errors,
        touched,
        values
      }) => {
        return (
          <Form onSubmit={handleSubmit} {...formItemLayout} layout="horizontal">
            <Form.Item label="Lesson name/title" hasFeedback>
              <Input
                value={values.title}
                placeholder="Enter Lesson name/title"
                name="title"
                onChange={handleChange}
                className={classnames('form-control', {
                  error: errors.title && touched.title
                })}
              />
              <ErrorMessage component="span" className="error" name="title" />
            </Form.Item>
            <Form.Item label="Lesson description" hasFeedback>
              <TextArea
                value={values.description}
                rows={4}
                placeholder="Enter Lesson description"
                name="description"
                onChange={handleChange}
                className={classnames('form-control', {
                  error: errors.description && touched.description
                })}
              />
              <ErrorMessage
                component="span"
                className="error"
                name="description"
              />
            </Form.Item>
            <Form.Item label="Thumbnail Image" hasFeedback>
              <Upload
                customRequest={dummyRequest}
                onRemove={() => {
                  values.thumbnail_image
                    ? setFieldValue('thumbnail_image', null)
                    : setFieldValue('new_thumbnail_image', null);
                }}
                beforeUpload={(file) => {
                  setFieldValue('new_thumbnail_image', file);
                }}
                fileList={
                  values.new_thumbnail_image
                    ? [values.new_thumbnail_image]
                    : values.thumbnail_image
                    ? [values.thumbnail_image]
                    : []
                }
                accept="image/png, image/jpeg"
                name="thumbnail_image"
                className={classnames('form-control', {
                  error: errors.thumbnail_image && touched.thumbnail_image
                })}
              >
                <Button>
                  <Icon type="upload" /> Upload Thumbnail Image
                </Button>
              </Upload>
              <ErrorMessage
                component="span"
                className="error"
                name="thumbnail_image"
              />
            </Form.Item>
            <Buttons isPrev={false} onNextClick={handleNextClick} />
          </Form>
        );
      }}
    />
  );
};

export default LessonStep;

LessonStep.prototypes = {
  onNextClick: PropTypes.func,
}
