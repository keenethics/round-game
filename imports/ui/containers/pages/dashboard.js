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
    users: Meteor.userId(),
    [`isFinished.${this.userId}`]: { $ne: true },
  }) : {};

  if (game && game.users && game.combinations && game.actions) {
    const userIndex = game.users.indexOf(Meteor.userId());

    if (userIndex > -1) {
      game.users.splice(userIndex, 1);

      const combination = game.combinations[user._id] || [];
      const actions = game.actions[game.users[0]] || {};

      return {
        isReady,
        isWaiting: game.waitingUsers && game.waitingUsers.indexOf(Meteor.userId()) > -1,
        user,
        game,
        combination,
        actions,
      };
    }

    return {
      isReady,
      user,
    };
  }

  return {
    isReady,
    user,
  };
})(Dashboard);
