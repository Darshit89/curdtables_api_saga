import React, { useCallback, useEffect, useState } from 'react';
import { Button, Divider, Table, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import lessonActions from '../../../Redux/Lesson/actions';
import Buttons from '../Buttons';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { history } from '../../../Redux/store';
import PropTypes from 'prop-types';
import ModalPopup from '../ModalPopup';

let dragingIndex = -1;



const VideoStep = ({ isNext, onPrevClick, isCreate, id }) => {
  const dispatch = useDispatch();
  const lesson = useSelector((state) => state.lesson);
  const [isEditVideoModal, setIsEditVideoModal] = useState(0);
  let { isLessonModalVisible, videos, action } = lesson;
  videos.sort((a, b) => a.sequence - b.sequence);

  const columns = [
    {
      title: <div className="header-style">Sequence</div>,
      dataIndex: 'sequence',
      key: 'sequence'
    },
    {
      title: <div className="header-style">Video name/title</div>,
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: <div className="header-style">Embedded link</div>,
      dataIndex: 'video_file',
      key: 'video_file',
      render: (text) => {
        return (
          <a target="_blank" href={text} rel="noopener noreferrer">
            {text}
          </a>
        );
      }
    },
    {
      title: <div className="header-style">Action</div>,
      key: 'action',
      render: (text, record, index) => (
        <span>
          <Button
            type="primary"
            shape="circle"
            icon="edit"
            size={'small'}
            onClick={() => showAddUpdateVideoModal(record)}
          ></Button>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure to delete sub-lesson?"
            okText="Yes"
            key={2}
            cancelText="No"
            onConfirm={() => deleteVideo(record, index)}
          >
            <Button
              type="primary"
              shape="circle"
              icon="delete"
              size={'small'}
            />
          </Popconfirm>
        </span>
      )
    }
  ];

  // Show modal popup for add/update videos
  const showAddUpdateVideoModal = (record) => {
    setIsEditVideoModal(record.sequence);
    record.isLessonModalVisible = true;
    dispatch(lessonActions.changeUpdateModalState(record));
  };

  // delete video data from redux
  const deleteVideo = useCallback(
    (record, index) => {
      dispatch(lessonActions.deleteVideoData(record));
      dispatch(lessonActions.deleteSingleVideo(record.id));
    },
    [dispatch]
  );

  // create lesson with all data
  const handleCreateClick = useCallback(() => {
    let { title, description, thumbnail_image, videos } = lesson;
    videos.map((video) => {
      if(video.id == '') {
        return delete video.id;
      }
    })
    var finalRequest = new FormData();
    finalRequest.append('title', title);
    finalRequest.append('description', description);
    finalRequest.append('thumbnail_image', thumbnail_image);
    finalRequest.append('videos', JSON.stringify(videos));
    dispatch(lessonActions.createLesson(finalRequest));
  }, [dispatch, lesson]);

  // Update lesson
  const handleUpdateClick = useCallback(() => {
    let { title, description, thumbnail_image, videos } = lesson;
    videos.map((video) => {
      if(video.id == '') {
        return delete video.id;
      }
    })
    var finalRequest = new FormData();
    finalRequest.append('id', id);
    finalRequest.append('title', title);
    finalRequest.append('description', description);
    if (thumbnail_image.lastModified) {
      finalRequest.append('thumbnail_image', thumbnail_image);
    }
    finalRequest.append('videos', JSON.stringify(videos));
    dispatch(lessonActions.updateLesson(finalRequest));
  }, [dispatch, lesson, id]);

  useEffect(() => {
    if (
      action === lessonActions.CREATE_LESSON_SUCCESS ||
      action === lessonActions.UPDATE_LESSON_SUCCESS
    ) {
      history.goBack();
    }
  }, [action]);

  const rowSource = {
    beginDrag(props) {
      dragingIndex = props.index;
      return {
        index: props.index
      };
    }
  };

  const rowTarget = {
    drop(props, monitor) {
      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return;
      }
      props.moveRow(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    }
  };

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRow = videos[dragIndex];
    const remaining = videos.filter((i) => i !== dragRow);
    const sorted = [
      ...remaining.slice(0, hoverIndex),
      dragRow,
      ...remaining.slice(hoverIndex)
    ];
    sorted.map((item, index) => {
      return (item.sequence = index + 1);
    });
    dispatch(lessonActions.dragAndDropVideoData(sorted));
  };

  const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }))(
    DragSource('row', rowSource, (connect) => ({
      connectDragSource: connect.dragSource()
    }))(BodyRow)
  );

  const components = {
    body: {
      row: DragableBodyRow
    }
  };
  return (
    <>
      <Button
        type="primary"
        onClick={() => showAddUpdateVideoModal({})}
        className="m-b-20"
      >
        Add Videos
      </Button>
      <DndProvider backend={HTML5Backend}>
        <Table
          rowKey={(video) => video.sequence}
          columns={columns}
          dataSource={videos}
          components={components}
          onRow={(record, index) => ({
            index,
            moveRow: moveRow
          })}
        />
      </DndProvider>

      <ModalPopup
        isEditVideoModal={isEditVideoModal}
        isLessonModalVisible={isLessonModalVisible}
      />

      <Buttons
        isNext={false}
        isCreate={!id ? true : false}
        onCreateClick={handleCreateClick}
        onPrevClick={onPrevClick}
        isEdit={id ? true : false}
        onEditClick={handleUpdateClick}
      />
    </>
  );
};

export default VideoStep;

VideoStep.prototypes = {
  isNext: PropTypes.bool,
  onPrevClick: PropTypes.func,
  isCreate: PropTypes.bool,
  id: PropTypes.number
};

const BodyRow = (props) => {
  const {
    isOver,
    connectDragSource,
    connectDropTarget,
    moveRow,
    ...restProps
  } = props;
  const style = { ...restProps.style, cursor: 'move' };

  let { className } = restProps;
  if (isOver) {
    if (restProps.index > dragingIndex) {
      className += ' drop-over-downward';
    }
    if (restProps.index < dragingIndex) {
      className += ' drop-over-upward';
    }
  }

  return connectDragSource(
    connectDropTarget(<tr {...restProps} className={className} style={style} />)
  );
};
