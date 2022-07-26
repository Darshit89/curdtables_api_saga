import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const Buttons = ({
  isNext,
  isPrev,
  isEdit,
  isCreate,
  onNextClick,
  onPrevClick,
  onEditClick,
  onCreateClick,
  name
}) => {
  return (
    <div className="steps-action">
      {isPrev && (
        <Button type="primary" onClick={onPrevClick} className="m-t-20">
          Previous
        </Button>
      )}
      {isNext && (
        <Button type="primary" onClick={onNextClick}>
          Next
        </Button>
      )}
      {isCreate && (
        <Button
          type="primary"
          onClick={onCreateClick}
          style={{ marginLeft: 8 }}
          className="m-t-20"
        >
          Create Lesson
        </Button>
      )}
      {isEdit && (
        <span style={{ cssFloat: 'right' }}>
          <Button
            type="primary"
            onClick={onEditClick}
            style={{ marginLeft: 8 }}
            className="m-t-20"
          >
            Update Lesson
          </Button>
        </span>
      )}
    </div>
  );
};

Buttons.propTypes = {
  isEdit: PropTypes.bool,
  isNext: PropTypes.bool,
  isPrev: PropTypes.bool,
  isCreate: PropTypes.bool,
  onNextClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onCreateClick: PropTypes.func,
  onPrevClick: PropTypes.func
};
Buttons.defaultProps = {
  isEdit: false,
  isNext: true,
  isCreate: false,
  isPrev: true,
  onNextClick: () => {},
  onEditClick: () => {},
  onCreateClick: () => {},
  onPrevClick: () => {}
};
export default Buttons;
