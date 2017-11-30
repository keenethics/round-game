/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import History from '/imports/api/history';

Meteor.publish('history.byGameId', function(gameId) {
  check(gameId, String);

  return History.find({ gameId });
});
