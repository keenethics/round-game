import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Users from '/imports/api/users';
import Games from '/imports/api/games';

import Dashboard from '/imports/ui/pages/dashboard';

export default withTracker(() => {
  const userHandle = Meteor.subscribe('users.current');
  const isReady = userHandle.ready();
  const user = isReady ? Users.findOne(Meteor.userId()) : {};

  const gameHandle = Meteor.subscribe('games.current');
  const game = gameHandle.ready() ? Games.findOne({
    users: Meteor.userId(), isFinished: { $ne: true },
  }) : {};

  const combination = (game && game.currentBids && game.currentBids[user._id]) || [];

  return {
    isReady,
    user,
    game,
    combination,
  };
})(Dashboard);
