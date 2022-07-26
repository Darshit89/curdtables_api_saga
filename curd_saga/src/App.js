import React, { Suspense } from 'react';
import './Styles/global.scss';
import Routes from './routes';
import { Spin } from 'antd';
import useLoader from './Helpers/useLoader';
import { history } from './Redux/store';
import Boot from './Redux/boot';
import Spinner from './Components/Spinner';
import 'antd/dist/antd.css';

const App = () => {
  const loading = useLoader();
  return (
    <Suspense fallback={<Spinner />}>
      <Spin spinning={loading} size="large">
        <Routes history={history} />
      </Spin>
    </Suspense>
  );
};
Boot()
  .then(() => App())
  .catch((error) => error);

export default App;
