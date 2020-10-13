// polyfill imports
import 'react-app-polyfill/ie11';
import './helpers/ie11_polyfill';
// React imports
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { init, reactRouterV5Instrumentation } from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { createBrowserHistory } from 'history';
import map from 'lodash/map';
import { Router, Switch, Route, matchPath } from 'react-router-dom';
// local imports
import {
  PATH_HOME, PATH_LOGIN, PATH_LOGIN_CREATE,
  PATH_SUPERVISOR, PATH_SUPERVISOR_SKILLS, PATH_SUPERVISOR_ROLES, PATH_SUPERVISOR_EMPLOYEES,
  PATH_SUPERVISOR_EMPLOYEE, PATH_SUPERVISOR_EMPLOYEE_SKILLS, PATH_SUPERVISOR_SKILL,
  PATH_SUPERVISOR_ROLE, PATH_SUPERVISOR_ROLE_SKILLS,
  PATH_MY, PATH_MY_ROLE, PATH_MY_SKILLS, PATH_MY_SKILL,
  PATH_MY_ROADMAP, PATH_MY_ROADMAP_ROLE, PATH_MY_ROADMAP_SKILLS, PATH_MY_ROADMAP_SKILL,
  PATH_MY_INFERRED_SKILLS // , PATH_MY_PREFERENCES
} from './config/paths';
import App from './App';
import './styles/index.scss';
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();

const routes = [
  // Login Screens
  { path: PATH_LOGIN_CREATE },
  { path: PATH_LOGIN },
  // Supervisor Screens
  { path: PATH_SUPERVISOR_EMPLOYEE_SKILLS },
  { path: PATH_SUPERVISOR_EMPLOYEE },
  { path: PATH_SUPERVISOR_EMPLOYEES },
  { path: PATH_SUPERVISOR_ROLE_SKILLS },
  { path: PATH_SUPERVISOR_ROLE },
  { path: PATH_SUPERVISOR_ROLES },
  { path: PATH_SUPERVISOR_SKILL },
  { path: PATH_SUPERVISOR_SKILLS },
  { path: PATH_SUPERVISOR },
  // Employee Screens
  { path: PATH_MY_ROADMAP_SKILL },
  { path: PATH_MY_ROADMAP_SKILLS },
  { path: PATH_MY_ROADMAP_ROLE },
  { path: PATH_MY_ROADMAP },
  { path: PATH_MY_ROLE },
  { path: PATH_MY_SKILL },
  { path: PATH_MY_SKILLS },
  { path: PATH_MY_INFERRED_SKILLS },
  // { path: PATH_MY_PREFERENCES },
  { path: PATH_MY },
  // Home Screen
  { path: PATH_HOME }
];

if (window.SENTRY_DSN) init({
  dsn: window.SENTRY_DSN,
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: reactRouterV5Instrumentation(history, routes, matchPath)
    })
  ],
  tracesSampleRate: 1.0
});

ReactDOM.render(
  <StrictMode>
    <Router history={history}>
      {/* Switch & Route are required here to make `useLocation` and `useParams` hooks work in Context Providers */}
      <Switch>
        <Route
            exact
            path={map(routes, 'path')}
            component={App}
        />
        <Route path="*" exact component={App}/>
      </Switch>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
