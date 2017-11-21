import { Meteor } from 'meteor/meteor';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { statuses } from '/imports/helpers/types';

import { startSearch, cancelSearch } from '/imports/api/users/actions';

import Layout from '/imports/ui/layout/layout';
import Game from '/imports/ui/containers/components/pages/dashboard/game/index';
import Users from '/imports/ui/containers/components/pages/dashboard/users';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { isReady, user, game } = this.props;

    if (!isReady) return null;

    const dashboardClass = classNames({
      dashboard: true,
      'dashboard-searching': user.status === statuses.search,
      'dashboard-game': user.status === statuses.game,
    });

    return (
      <Layout>
        <div className={dashboardClass}>
          <div className="dashboard-header" />
          <div className="dashboard-content">
            <Users user={user} game={game} />
            <div className="dashboard-actions">
              {user.status === statuses.default && (
                <input type="button" value="Search" onClick={startSearch} />
              )}
              {user.status === statuses.search && (
                <input type="button" className="red" value="Cancel" onClick={cancelSearch} />
              )}
            </div>
          </div>
          {user.status === statuses.game && (
            <Game />
          )}
          <input type="button" value="Reset" onClick={() => Meteor.call('users.reset')} />
        </div>
      </Layout>
    );
  }
}

Dashboard.propTypes = {
  isReady: PropTypes.bool,
  user: PropTypes.object,
  game: PropTypes.object,
};
Dashboard.defaultProps = {
  isReady: false,
  user: {},
  game: {},
};
