import React from 'react';
import { Spin } from 'antd';

const Spinner = () => {
  return (
    <div className="d-flex alignr-items-center justify-content-center flex-column set-layout">
      <Spin size="large" />
    </div>
  );
};

export default Spinner;
