import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Users from '/imports/api/users';

import UsersComponent from '/imports/ui/components/pages/dashboard/users';

export default withTracker(({ user, game }) => {
  if (game.users) {
    const { users } = game;
    const index = users.indexOf(user._id);

    if (index > -1) {
      users.splice(index, 1);
    }
    if (users.length === 1 && !users.includes(user._id)) {
      const opponentHandle = Meteor.subscribe('users.byId', users[0]);
      const isReady = opponentHandle.ready();

      const opponent = Users.findOne(users[0]);

      return {
        isReady,
        opponent,
      };
    }

    return {
      isReady: true,
    };
  }

  return {
    isReady: true,
  };
})(UsersComponent);
