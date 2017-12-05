import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Users from '/imports/api/users';

import Rating from '/imports/ui/modals/rating';

export default withTracker(({ position }) => {
  const usersRatingHandle = Meteor.subscribe('users.rating');
  const users = usersRatingHandle.ready() ? Users.find(
    { username: { $ne: 'bot' } },
    { sort: { points: -1 }, fields: { username: 1, points: 1 }, limit: 5 },
  ).fetch() : [];

  if (position && position > 5) {
    const userHandle = Meteor.subscribe('users.current');
    const user = userHandle.ready() ? Users.findOne(Meteor.userId()) : {};

    return {
      isReady: userHandle.ready() && usersRatingHandle.ready(),
      user,
      users,
    };
  }

  return {
    isReady: usersRatingHandle.ready(),
    users,
  };
})(Rating);
