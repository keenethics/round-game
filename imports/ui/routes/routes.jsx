import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Route from '/imports/ui/routes/route';

import Index from '/imports/ui/containers/pages/index';
import Room from '/imports/ui/containers/pages/room';

import NoMatch from '/imports/ui/pages/no-match';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" component={Index} exact />
      <Route path="/rooms/:roomId" component={Room} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
);

export default Routes;
