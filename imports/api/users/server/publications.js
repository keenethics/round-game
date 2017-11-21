/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('users.current', function() {
  return Meteor.users.find(this.userId, {
    fields: {
      username: 1,
      status: 1,
    },
  });
});

Meteor.publish('users.byId', function(userId) {
  check(userId, String);

  return Meteor.users.find(userId, {
    fields: {
      username: 1,
      status: 1,
    },
  });
});
