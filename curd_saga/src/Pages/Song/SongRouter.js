import React, { lazy } from 'react';
import { Route, Switch } from 'react-router';

const songSubRoutes = [
  {
    url: '/song',
    component: lazy(() => import('./SongList'))
  },
  {
    url: '/song/create',
    component: lazy(() => import('./CreateSong'))
  },
  {
    url: '/song/update/:id',
    component: lazy(() => import('./UpdateSong'))
  },
  {
    url: '/song/detail/:id',
    component: lazy(() => import('./DetailSong'))
  }
];

const ArtistRouter = () => {
  return (
    <Switch >
      {songSubRoutes.map((singleRoute) => {
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

export { songSubRoutes }
export default ArtistRouter;