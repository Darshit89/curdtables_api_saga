import React, { useCallback, useEffect, useState } from 'react';
import Layouts from '../../Components/Layouts';
import {
  Table,
  Divider,
  Button,
  Popconfirm,
  Select,
  Tag,
  PageHeader
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormat } from '../../Helpers/dateFormat';
import lessonActions from '../../Redux/Lesson/actions';
import moment from 'moment';
import * as queryString from 'query-string';
import { history } from '../../Redux/store';
import { Link } from 'react-router-dom';

const { Option } = Select;

const LessonList = () => {
  const dispatch = useDispatch();
  const { lessonList } = useSelector((state) => state.lesson);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    const queryParams = {
      page: 1
    };
    dispatch(lessonActions.getLessonList(queryString.stringify(queryParams)));
  }, [dispatch]);

  const redirectToAddLesson = () => {
    history.push(`/lesson/create`);
  };

  const columns = [
    {
      title: <div className="header-style">Lesson name/title</div>,
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: <div className="header-style">Number of videos</div>,
      dataIndex: 'numberOfVideo',
      key: 'numberOfVideo'
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
          <Link to={`lesson/update/${record.id}`}>
            <Button type="primary" shape="circle" icon="edit" size={'small'} />
          </Link>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure to delete Lesson?"
            okText="Yes"
            key={2}
            cancelText="No"
            onConfirm={() => deleteLesson(record.id)}
          >
            <Button
              type="primary"
              shape="circle"
              icon="delete"
              size={'small'}
            />
          </Popconfirm>
          <Divider type="vertical" />
          <Link to={`lesson/detail/${record.id}`}>
            <Button type="primary" shape="circle" icon="eye" size={'small'} />
          </Link>
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
    dispatch(lessonActions.getlessonList(queryString.stringify(queryParams)));
  };

  // Delete Lesson
  const deleteLesson = useCallback(
    (id) => {
      dispatch(lessonActions.deleteLesson(id));
    },
    [dispatch]
  );

  // change status
  const onChangeStatus = (value) => {
    const requestData = {
      ids: selectedRowKeys,
      status: parseInt(value)
    };
    dispatch(lessonActions.lessonChangeStatus(requestData));
    setSelectedRowKeys([]);
    setValue('');
  };

  return (
    <Layouts title="assets" classname="grid">
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          className="site-page-header"
          title="Lessons"
          extra={[
            <Button
              key="1"
              className="alignt-rignt"
              type="primary"
              onClick={redirectToAddLesson}
            >
              Add Lesson
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
          rowKey={(lesson) => lesson.id}
          pagination={{
            current: lessonList?.pagination?.page || 1,
            total: lessonList?.pagination?.rowCount || 1
          }}
          rowSelection={{
            selectedRowKeys,
            onChange
          }}
          columns={columns}
          dataSource={lessonList?.payload}
          onChange={onChangePagination}
          scroll={{ x: 768 }}
        />
      </div>
    </Layouts>
  );
};

export default LessonList;
