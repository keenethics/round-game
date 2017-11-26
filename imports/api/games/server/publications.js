/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Games from '/imports/api/games';

Meteor.publish('games.current', function() {
  return Games.find({ users: this.userId, isFinished: { $ne: true } }, {
    fields: {
      users: 1,
      isFinished: 1,
      createdAt: 1,
      previousBids: 1,
      [`currentBids.${this.userId}`]: 1,
    },
  });
});

Meteor.publish('games.byGameId', function(gameId) {
  check(gameId, String);

  return Games.find(gameId);
});
