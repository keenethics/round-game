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
    const {
      isReady,
      isWaiting,
      user,
      game,
      combination,
      actions,
    } = this.props;

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
          {user.status === statuses.game && [
            <Game
              key="game"
              combination={combination}
              actions={actions}
              isWaiting={isWaiting}
              countdown={game && game.createdAt ? game.createdAt : null}
            />,
            <p key="tips" className="tips">Click on the card to change it</p>,
          ]}
          {Meteor.isDevelopment && (
            <div className="dashboard-development" style={{ margin: '20px 0' }}>
              <input
                type="button"
                className="red"
                value="Reset all"
                onClick={() => Meteor.call('users.resetAll')}
                style={{ margin: '0 auto' }}
              />
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

Dashboard.propTypes = {
  isReady: PropTypes.bool,
  isWaiting: PropTypes.bool,
  user: PropTypes.object,
  game: PropTypes.object,
  combination: PropTypes.array,
  actions: PropTypes.object,
};
Dashboard.defaultProps = {
  isReady: false,
  isWaiting: false,
  user: {},
  game: {},
  combination: [],
  actions: {},
};
