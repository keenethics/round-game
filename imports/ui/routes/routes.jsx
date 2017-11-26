import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Route from '/imports/ui/routes/route';

import Index from '/imports/ui/containers/pages/index';

import NoMatch from '/imports/ui/pages/no-match';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" component={Index} exact />
      <Route component={NoMatch} />
    </Switch>
  </Router>
);

export default Routes;
