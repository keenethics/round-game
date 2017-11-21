/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Games from '/imports/api/games';

Meteor.publish('games.current', function() {
  return Games.find({ users: this.userId, isFinished: { $ne: true } });
});

Meteor.publish('games.byGameId', function(gameId) {
  check(gameId, String);

  return Games.find(gameId);
});
