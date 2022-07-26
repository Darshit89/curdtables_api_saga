import React, { lazy } from 'react';
import { Route, Switch } from 'react-router';

const artistSubRoutes = [
  {
    url: '/artist',
    component: lazy(() => import('./ArtistList'))
  },
  {
    url: '/artist/create',
    component: lazy(() => import('./CreateArtist'))
  }
];

const UserRouter = () => {
  return (
    <Switch >
      {artistSubRoutes.map((singleRoute) => {
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

export { artistSubRoutes }
export default UserRouter;