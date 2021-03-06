/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Games from '/imports/api/games';

Meteor.publish('games.current', function() {
  return Games.find({ users: this.userId, [`isFinished.${this.userId}`]: { $ne: true } }, {
    fields: {
      users: 1,
      [`combinations.${this.userId}`]: 1,
      combinationsOpened: 1,
      actions: 1,
      waitingUsers: 1,
      [`isFinished.${this.userId}`]: 1,
      createdAt: 1,
    },
  });
});

Meteor.publish('games.byGameId', function(gameId) {
  check(gameId, String);

  return Games.find(gameId);
});
