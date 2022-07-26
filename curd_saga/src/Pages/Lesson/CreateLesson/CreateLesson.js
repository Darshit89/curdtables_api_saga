import React, { useCallback, useEffect, useState } from 'react';
import Layouts from '../../../Components/Layouts';
import { Divider, Steps, PageHeader } from 'antd';
import LessonStep from '../CreateLesson/LessonStep';
import VideoStep from '../CreateLesson/VideoStep';
import lessonActions from '../../../Redux/Lesson/actions';
import { useDispatch } from 'react-redux';
import * as queryString from 'query-string';
import PropTypes from 'prop-types';

const { Step } = Steps;

const steps = [
  {
    title: 'Lesson',
    content: <LessonStep />
  },
  {
    title: 'Videos',
    content: <VideoStep />
  }
];

const CreateLesson = ({ match, ...rest }) => {
  const dispatch = useDispatch();
  const { id } = match.params;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(lessonActions.getLessonById(id));
      const queryParams = {
        page: 1
      };
      dispatch(
        lessonActions.getSubLessonById(id, queryString.stringify(queryParams))
      );
    }
    if(!id) {
      dispatch(lessonActions.resetLesson());
    }
  }, [dispatch, id]);

  const onNextClick = useCallback(() => {
    const nextStep = current + 1;
    if (nextStep <= steps.length) {
      setCurrent(nextStep);
    }
  }, [current]);

  const onPrevClick = useCallback(() => {
    const prevStep = current - 1;
    if (prevStep >= 0) {
      setCurrent(prevStep);
    }
  }, [current]);

  return (
    <Layouts title="assets" classname="grid">
      <div className="user-form">
        <PageHeader
          className="site-page-header"
          title={id ? 'Update Lesson' : 'Create Lesson'}
        ></PageHeader>
        <Divider type="horizontal" />
        <Steps current={current} style={{ width: 400 }}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <Divider type="horizontal" />
        <div className="steps-content">
          {React.cloneElement(steps?.[current]?.content || <div />, {
            onNextClick,
            onPrevClick,
            id,
            ...rest
          })}
        </div>
      </div>
    </Layouts>
  );
};

export default CreateLesson;

CreateLesson.propTypes = {
  match: PropTypes.object
};
