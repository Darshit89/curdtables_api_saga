import React, { useEffect, useMemo } from 'react';
import Layouts from '../../Components/Layouts';
import { Row, Col, Divider, Tag, PageHeader, Descriptions } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import songActions from '../../Redux/Song/actions';
import moment from 'moment';
import PropTypes from 'prop-types';
import { dateFormat } from '../../Helpers/dateFormat';
import AudioPlayer from '../../Components/AudioPlayer/AudioPlayer';

const DetailSong = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const { songResponse } = useSelector((state) => state.song);

  useEffect(() => {
    dispatch(songActions.getSongById(id));
  }, [dispatch, id]);

  const songStatus = useMemo(() => {
    let status = songResponse?.status;
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
  }, [songResponse]);

  const songLevel = useMemo(() => {
    let song_level = parseInt(songResponse?.song_level);
    switch (song_level) {
      case 1:
        song_level = <Tag color="red">Easy</Tag>;
        break;
      case 2:
        song_level = <Tag color="green">Medium</Tag>;
        break;
      case 3:
        song_level = <Tag color="blue">Difficult</Tag>;
        break;
      default:
        song_level = <Tag color="gold">Undefined</Tag>;
    }
    return song_level;
  }, [songResponse]);

  return (
    <Layouts title="assets" classname="grid">
      <div className="user-form">
        <PageHeader
          className="site-page-header"
          title="Details of Song"
        ></PageHeader>
        <Divider type="horizontal" />
        <Descriptions>
          <Descriptions.Item label="Song Title">
            {songResponse?.title}
          </Descriptions.Item>
          <Descriptions.Item label="Artist Name">
            {songResponse?.artist?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Song Level">{songLevel}</Descriptions.Item>
          <Descriptions.Item label="BPM">
            {songResponse?.bpm}
          </Descriptions.Item>
          <Descriptions.Item label="Lyrics">
            {songResponse?.lyrics}
          </Descriptions.Item>
          <Descriptions.Item label="Is Featured Song">
            {songResponse?.is_featured ? 'Yes' : 'No'}
          </Descriptions.Item>
          <Descriptions.Item label="Created date">
            {moment(
              songResponse?.created_at,
              dateFormat.databaseDateFormat
            ).format(dateFormat.commonListDateFormat)}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{songStatus}</Descriptions.Item>
          <Descriptions.Item label="cover Image">
            <img
              src={songResponse?.image_url}
              alt="song"
              height="100px"
              width="100px"
            />
          </Descriptions.Item>
        </Descriptions>
        <Row className="m-t-15">
          <Col span={4}>Song/audio Player:</Col>
        </Row>
        {songResponse && <AudioPlayer songResponse={songResponse} />}
      </div>
    </Layouts>
  );
};

export default DetailSong;

DetailSong.propTypes = {
  match: PropTypes.object
};
