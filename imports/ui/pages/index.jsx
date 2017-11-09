import React from 'react';
import PropTypes from 'prop-types';

import Landing from '/imports/ui/pages/landing';
import Dashboard from '/imports/ui/pages/dashboard';

const Index = ({ userId }) => (userId ? <Dashboard /> : <Landing />);

Index.propTypes = {
  userId: PropTypes.string,
};
Index.defaultProps = {
  userId: null,
};

export default Index;
