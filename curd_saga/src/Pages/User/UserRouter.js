import React, { lazy } from 'react';
import { Route, Switch } from 'react-router';

const userSubRoutes = [
  {
    url: '/user',
    component: lazy(() => import('./UserList'))
  },
  {
    url: '/user/create',
    component: lazy(() => import('./CreateUser'))
  },
  {
    url: '/user/detail/:id',
    component: lazy(() => import('./DetailUser'))
  }
];

const UserRouter = () => {
  return (
    <Switch >
      {userSubRoutes.map((singleRoute) => {
        const { path, exact, url, ...otherProps } = singleRoute;
        return (
          <Route
            exact={exact === false ? false : true}
            key={singleRoute.url}
            path={singleRoute.url}
            {...otherProps}
          />
        );
      })}
    </Switch>
  );
};

export { userSubRoutes }
export default UserRouter;
