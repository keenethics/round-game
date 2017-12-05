/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Users from '/imports/api/users';

Meteor.publish('users.current', function() {
  return Users.find(this.userId, {
    fields: {
      username: 1,
      status: 1,
      points: 1,
    },
  });
});

Meteor.publish('users.byId', function(userId) {
  check(userId, String);

  return Users.find(userId, {
    fields: {
      username: 1,
      status: 1,
      points: 1,
    },
  });
});

Meteor.publish('users.rating', function() {
  return Users.find(
    { username: { $ne: 'bot' } },
    { fields: { username: 1, points: 1 }, limit: 5 },
  );
});
