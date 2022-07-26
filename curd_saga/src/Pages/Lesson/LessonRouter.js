import React, { lazy } from 'react';
import { Route, Switch } from 'react-router';

const lessonSubRoutes = [
  {
    url: '/lesson',
    component: lazy(() => import('./LessonList'))
  },
  {
    url: '/lesson/create',
    component: lazy(() => import('./CreateLesson/CreateLesson'))
  },
  {
    url: '/lesson/update/:id',
    component: lazy(() => import('./CreateLesson/CreateLesson'))
  },
  {
    url: '/lesson/detail/:id',
    component: lazy(() => import('./DetailLesson'))
  }
];

const LessonRouter = () => {
  return (
    <Switch >
      {lessonSubRoutes.map((singleRoute) => {
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

export { lessonSubRoutes }
export default LessonRouter;