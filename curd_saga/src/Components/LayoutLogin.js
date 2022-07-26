import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

const HeaderDiv = props => {
  const { classname, children } = props;
  return (
    <Layout>
      <div className={`${classname}`}>{children}</div>
    </Layout>
  );
};

export default HeaderDiv;

HeaderDiv.prototype = {
  classname: PropTypes.string,
  children: PropTypes.object
};
