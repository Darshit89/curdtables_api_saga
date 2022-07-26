import React, { lazy } from 'react';
import { Route, Switch } from 'react-router';

const chordSubRoutes = [
  {
    url: '/chord',
    component: lazy(() => import('./ChordList'))
  },
  {
    url: '/chord/create',
    component: lazy(() => import('./CreateChord'))
  }
];

const ChordRouter = () => {
  return (
    <Switch>
      {chordSubRoutes.map((singleRoute) => {
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

export { chordSubRoutes };
export default ChordRouter;
