import React from 'react';
import PropTypes from 'prop-types';

import { runSearch, userReady, stopSearch } from '/imports/api/queue/actions';

import Layout from '/imports/ui/layout/layout';

import SearchStatus from '/imports/ui/components/pages/dashboard/search-status/index';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { isReady, user, opponents } = this.props;

    if (!isReady) return null;

    return (
      <Layout name="dashboard">
        <div className="container">
          <div className="block search-block">
            {!!user.status || (
              <input type="button" value="Search opponents" onClick={runSearch} />
            )}
            {user.status === 'search' && (
              <input type="button" value="Cancel search" onClick={stopSearch} />
            )}
            {user.status === 'pending' && (
              <input type="button" value="Start" onClick={userReady} />
            )}
            <SearchStatus user={user} opponents={opponents} />
          </div>
        </div>
      </Layout>
    );
  }
}

Dashboard.propTypes = {
  isReady: PropTypes.bool,
  user: PropTypes.object,
  opponents: PropTypes.array,
};
Dashboard.defaultProps = {
  isReady: false,
  user: {},
  opponents: {},
};
