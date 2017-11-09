import { Meteor } from 'meteor/meteor';

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const RouteWrapper = ({ path, component: Component, fortified }) => (
  <Route
    path={path}
    render={props => (
      fortified && !Meteor.userId() ? <Redirect to={{ pathname: '/' }} /> : <Component {...props} />
    )}
  />
);

RouteWrapper.propTypes = {
  path: PropTypes.string,
  component: PropTypes.func,
  fortified: PropTypes.bool,
};
RouteWrapper.defaultProps = {
  path: '',
  component: null,
  fortified: false,
};

export default RouteWrapper;
