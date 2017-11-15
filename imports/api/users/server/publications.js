/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('users.byId', function(userId) {
  check(userId, String);

  return Meteor.users.find(userId, {
    fields: {
      status: 1,
      username: 1,
    },
  });
});
