import { useSelector } from 'react-redux';

export default () => {
  return useSelector((state) => {
    return (
      Object.keys(state).filter((key) => state[key]?.loading === true).length >
      0
    );
  });
};
