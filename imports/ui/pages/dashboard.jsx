import { Meteor } from 'meteor/meteor';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { statuses } from '/imports/helpers/types';

import { startSearch, cancelSearch } from '/imports/api/users/actions';

import Layout from '/imports/ui/layout/layout';
import Game from '/imports/ui/containers/components/pages/dashboard/game/index';
import Users from '/imports/ui/containers/components/pages/dashboard/users';
import Actions from '/imports/ui/components/pages/dashboard/actions';

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
          <div className="dashboard-content">
            <Users user={user} game={game} />
            <Actions user={user} startSearch={startSearch} cancelSearch={cancelSearch} />
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
