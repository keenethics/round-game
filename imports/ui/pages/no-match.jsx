import React from 'react';
import PropTypes from 'prop-types';

import Layout from '/imports/ui/layout/layout';

const NoMatch = ({ history }) => (
  <Layout name="no-match">
    <h1>Page not found</h1>
    <a
      href="/"
      onClick={(e) => {
        e.preventDefault();
        history.goBack();
      }}
    >
      Return back
    </a>
  </Layout>
);

NoMatch.propTypes = {
  history: PropTypes.object,
};
NoMatch.defaultProps = {
  history: {},
};

export default NoMatch;
