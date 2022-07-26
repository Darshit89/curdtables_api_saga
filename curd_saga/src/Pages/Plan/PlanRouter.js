import React, { lazy } from 'react';
import { Route, Switch } from 'react-router';

const planSubRoutes = [
  {
    url: '/plan',
    component: lazy(() => import('./PlanList'))
  },
  {
    url: '/plan/create',
    component: lazy(() => import('./CreatePlan'))
  }
];

const PlanRouter = () => {
  return (
    <Switch>
      {planSubRoutes.map((singleRoute) => {
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

export { planSubRoutes };
export default PlanRouter;
