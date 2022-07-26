import React, { useEffect, useMemo } from 'react';
import Layouts from '../../Components/Layouts';
import { Divider, Tag, PageHeader, Descriptions, Card, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../../Redux/User/actions';
import moment from 'moment';
import PropTypes from 'prop-types';
import { dateFormat } from '../../Helpers/dateFormat';

const DetailUser = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userActions.getUserById(id));
  }, [dispatch, id]);

  const userStatus = useMemo(() => {
    let status = userData?.status;
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
  }, [userData]);

  return (
    <Layouts title="assets" classname="grid">
      <div className="user-form">
        <PageHeader
          className="site-page-header"
          title="Details of User"
        ></PageHeader>
        <Divider type="horizontal" />
        <Descriptions>
          <Descriptions.Item label="Registered No">
            {userData?.id}
          </Descriptions.Item>
          <Descriptions.Item label="User name">
            {userData?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email address">
            {userData?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Date of registration">
            {moment(userData?.created_at, dateFormat.databaseDateFormat).format(
              dateFormat.commonListDateFormat
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{userStatus}</Descriptions.Item>
        </Descriptions>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              {userData.subscription && userData.subscription.length && <Card title="Subscription details :" bordered={true} style={{ width: 300 }}>
                <p>Amout Paid: ${userData.subscription[0].price}</p>
                <p>Renewal date:  {moment(userData?.subscription[0].end_date).format(
                  'Do MMM, YYYY'
                )}</p>
              </Card>}
            </Col>
            <Col span={8}>
              {userData.cards && userData.cards.length && <Card title="Cards details :" bordered={true} style={{ width: 300 }}>
                <p>Card Number: **** **** ****{userData.cards[0].number}</p>
              </Card>}
            </Col>
          </Row>
        </div>
      </div>
    </Layouts>
  );
};

export default DetailUser;

DetailUser.propTypes = {
  match: PropTypes.object
};
