import React, { useCallback, useEffect, useState } from 'react';
import Layouts from '../../Components/Layouts';
import {
  PageHeader,
  Button,
  Select,
  Table,
  Tag,
  Divider,
  Popconfirm
} from 'antd';
import { Link } from 'react-router-dom';
import { history } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormat } from '../../Helpers/dateFormat';
import songActions from '../../Redux/Song/actions';
import moment from 'moment';
import * as queryString from 'query-string';

const { Option } = Select;

const SongList = () => {
  const dispatch = useDispatch();
  const { songList } = useSelector((state) => state.song);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [value, setValue] = useState('');

  const columns = [
    {
      title: <div className="header-style">Song Title</div>,
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: <div className="header-style">Artist Name</div>,
      dataIndex: "artist['name']",
      key: "artist['name']"
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
          <Link to={`song/update/${record.id}`}>
            <Button type="primary" shape="circle" icon="edit" size={'small'} />
          </Link>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure to delete Song?"
            okText="Yes"
            key={2}
            cancelText="No"
            onConfirm={() => deleteSong(record.id)}
          >
            <Button
              type="primary"
              shape="circle"
              icon="delete"
              size={'small'}
            />
          </Popconfirm>
          <Divider type="vertical" />
          <Link to={`song/detail/${record.id}`}>
            <Button type="primary" shape="circle" icon="eye" size={'small'} />
          </Link>
        </span>
      )
    }
  ];

  const redirectToAddSong = () => {
    history.push(`/song/create`);
  };

  useEffect(() => {
    const queryParams = {
      page: 1
    };
    dispatch(songActions.getSongList(queryString.stringify(queryParams)));
  }, [dispatch]);

  const onChangePagination = (pagination) => {
    const queryParams = {
      page: pagination.current
    };
    dispatch(songActions.getSongList(queryString.stringify(queryParams)));
  };

  // to select multiple record for status active/Inactive
  const onChange = useCallback((selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  }, []);

  // change status
  const onChangeStatus = (value) => {
    const requestData = {
      ids: selectedRowKeys,
      status: parseInt(value)
    };
    dispatch(songActions.songChangeStatus(requestData));
    setSelectedRowKeys([]);
    setValue('');
  };

  // Delete Song
  const deleteSong = useCallback(
    (id) => {
      dispatch(songActions.deleteSong(id));
    },
    [dispatch]
  );
  return (
    <Layouts title="assets" classname="grid">
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          className="site-page-header"
          title="Songs"
          extra={[
            <Button
              key="1"
              className="alignt-rignt"
              type="primary"
              onClick={redirectToAddSong}
            >
              Add Song
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
          rowKey={(artist) => artist.id}
          pagination={{
            current: songList?.pagination?.page || 1,
            total: songList?.pagination?.rowCount || 1
          }}
          rowSelection={{
            selectedRowKeys,
            onChange
          }}
          columns={columns}
          dataSource={songList?.songs}
          onChange={onChangePagination}
          scroll={{ x: 768 }}
        />
      </div>
    </Layouts>
  );
};

export default SongList;
