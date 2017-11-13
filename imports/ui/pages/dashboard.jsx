import React from 'react';
import PropTypes from 'prop-types';

import { runSearch, stopSearch } from '/imports/api/queue/actions';

import Layout from '/imports/ui/layout/layout';

import Opponents from '/imports/ui/containers/components/pages/dashboard/opponents';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { isReady, user } = this.props;

    if (!isReady) return null;

    return (
      <Layout name="dashboard">
        <div className="container">
          <div className="block search-block">
            {user.status === 'search' || (
              <input type="button" value="Search opponents" onClick={runSearch} />
            )}
            {user.status === 'search' && (
              <input type="button" value="Cancel search" onClick={stopSearch} />
            )}
            {user.status === 'search' && (
              <Opponents />
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

Dashboard.propTypes = {
  isReady: PropTypes.bool,
  user: PropTypes.object,
};
Dashboard.defaultProps = {
  isReady: false,
  user: {},
};
