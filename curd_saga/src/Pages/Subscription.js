import React, { useEffect } from 'react';
import Layouts from '../Components/Layouts';
import {
	Table,
	Tag,
	PageHeader
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormat } from '../Helpers/dateFormat';
import planActions from '../Redux/Plan/actions';
import moment from 'moment';
import * as queryString from 'query-string';

const UserSubscription = () => {
	const dispatch = useDispatch();
	const { subscriptionList } = useSelector((state) => state.plan);

	useEffect(() => {
		const queryParams = {
			page: 1
		};
		dispatch(planActions.getUserSubscriptionList(queryString.stringify(queryParams)));
	}, [dispatch]);


	const columns = [
		{
			title: <div className="header-style">Transaction id</div>,
			dataIndex: 'subscription_id',
			key: 'subscription_id'
		},
		{
			title: <div className="header-style">User name</div>,
			dataIndex: "user['name']",
			key: "user['name']"
		},
		{
			title: <div className="header-style">Subscription plan</div>,
			dataIndex: "plan['name']",
			key: "plan['name']"
		},
		{
			title: <div className="header-style">Transaction amount</div>,
			dataIndex: 'price',
			key: 'price',
			render: text => <p>${text}</p>
		},
		{
			title: <div className="header-style">Transaction date</div>,
			dataIndex: 'start_date',
			key: 'start_date',
			render: (text) => {
				return moment(text, dateFormat.databaseDateFormat).format(
					dateFormat.commonListDateFormat
				);
			}
		},
		{
			title: <div className="header-style">Payment status</div>,
			dataIndex: 'payment_status',
			key: 'payment_status',
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
		}
	];

	const onChangePagination = (pagination) => {
		const queryParams = {
			page: pagination.current
		};
		dispatch(planActions.getUserSubscriptionList(queryString.stringify(queryParams)));
	};

	return (
		<Layouts title="assets" classname="grid">
			<div className="site-page-header-ghost-wrapper">
				<PageHeader
					className="site-page-header"
					title="User Subscriptions"
				></PageHeader>
			</div>
			<div className="user-form">
				<Table
					rowKey={(user) => user.id}
					pagination={{
						current: subscriptionList?.pagination?.page || 1,
						total: subscriptionList?.pagination?.rowCount || 1
					}}
					columns={columns}
					dataSource={subscriptionList?.subscription}
					onChange={onChangePagination}
					scroll={{ x: 768 }}
				/>
			</div>
		</Layouts>
	);
};

export default UserSubscription;
