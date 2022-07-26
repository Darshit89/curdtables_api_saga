import React, { lazy, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import { connect } from 'react-redux';
import routesString from './Helpers/routesString';
import { ConnectedRouter } from 'connected-react-router';
import { userSubRoutes } from './Pages/User/UserRouter';
import { chordSubRoutes } from './Pages/Chord/ChordRouter';
import { planSubRoutes } from './Pages/Plan/PlanRouter';
import { artistSubRoutes } from './Pages/Artist/ArtistRouter';
import { songSubRoutes } from './Pages/Song/SongRouter';
import { lessonSubRoutes } from './Pages/Lesson/LessonRouter';

const Login = lazy(() => import('./Pages/Login'));
const Profile = lazy(() => import('./Pages/Profile'));
const ForgotPassword = lazy(() => import('./Pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./Pages/ResetPassword'));
const User = lazy(() => import('./Pages/User/UserRouter'));
const Chord = lazy(() => import('./Pages/Chord/ChordRouter'));
const Plan = lazy(() => import('./Pages/Plan/PlanRouter'));
const Artist = lazy(() => import('./Pages/Artist/ArtistRouter'));
const Song = lazy(() => import('./Pages/Song/SongRouter'));
const Lesson = lazy(() => import('./Pages/Lesson/LessonRouter'));
const UserSubscription = lazy(() => import('./Pages/Subscription'));

const NoMatchPage = () => {
  return (
    <Row className="margin-top">
      <Col xs={{ span: 12, offset: 6 }}>
        <Card>
          <div className="card-body">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h2>Page not found</h2>
              <Link to="/profile">back to profile</Link>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const UnRestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/profile',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
const Routes = ({ history, isLoggedIn }) => {
  console.log(isLoggedIn, "isLoggedIn")
  const userRoutes = useMemo(() => {
    return routesString(userSubRoutes, 'user');
  }, []);

  const chordRoutes = useMemo(() => {
    return routesString(chordSubRoutes, 'chord');
  }, []);

  const artistRoutes = useMemo(() => {
    return routesString(artistSubRoutes, 'artist');
  }, []);

  const songRoutes = useMemo(() => {
    return routesString(songSubRoutes, 'song');
  }, []);

  const planRoutes = useMemo(() => {
    return routesString(planSubRoutes, 'plan');
  }, []);
 
  const lessonRoutes = useMemo(() => {
    return routesString(lessonSubRoutes, 'lesson');
  }, []);
  
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <UnRestrictedRoute
          exact
          path="/"
          component={Login}
          isLoggedIn={isLoggedIn}
        />
        <UnRestrictedRoute
          exact
          path="/forgot-password"
          component={ForgotPassword}
          isLoggedIn={isLoggedIn}
        />
        <UnRestrictedRoute
          exact
          path="/reset-password/:token"
          component={ResetPassword}
          isLoggedIn={isLoggedIn}
        />
        <RestrictedRoute
          path="/profile"
          component={Profile}
          isLoggedIn={isLoggedIn}
        />
        <RestrictedRoute
          exact
          path={userRoutes}
          component={User}
          isLoggedIn={isLoggedIn}
        />
        <RestrictedRoute
          exact
          path={chordRoutes}
          component={Chord}
          isLoggedIn={isLoggedIn}
        />
         <RestrictedRoute
          exact
          path={artistRoutes}
          component={Artist}
          isLoggedIn={isLoggedIn}
        />
        <RestrictedRoute
          exact
          path={songRoutes}
          component={Song}
          isLoggedIn={isLoggedIn}
        />
        <RestrictedRoute
          exact
          path={planRoutes}
          component={Plan}
          isLoggedIn={isLoggedIn}
        />
        <RestrictedRoute
          exact
          path={lessonRoutes}
          component={Lesson}
          isLoggedIn={isLoggedIn}
        />
        <RestrictedRoute
          path="/subscription"
          component={UserSubscription}
          isLoggedIn={isLoggedIn}
        />
        <Route path="*" component={NoMatchPage} />
      </Switch>
    </ConnectedRouter>
  );
};
export default connect((state) => ({
  isLoggedIn: state.auth.token !== null
}))(Routes);
