import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { groupBy } from 'lodash';

import Users from '/imports/api/users';
import Games from '/imports/api/games';
import History from '/imports/api/history';

import { statuses, cards } from '/imports/helpers/types';
import compare from '/imports/helpers/compare';

export const flipCard = new ValidatedMethod({
  name: 'games.flipCard',
  validate: new SimpleSchema({
    index: { type: Number },
  }).validator(),
  run({ index }) {
    if (!this.userId) {
      throw new Meteor.Error('games.flipCard', 'Must be logged in to flip card');
    }

    const game = Games.findOne({ users: this.userId, isFinished: { $ne: true } });

    if (game && game.waitingUsers && game.waitingUsers.includes(this.userId)) {
      throw new Meteor.Error('games.flipCard', 'User can\'t flip card now');
    }

    if (game && game.combinations && game.combinations[this.userId]) {
      const { combinations, actions } = game;
      const currentCombinations = combinations[this.userId];
      const cardIndex = cards.indexOf(currentCombinations[index]);

      if (cardIndex > -1) {
        currentCombinations.splice(index, 1, (cardIndex + 1) > 2 ? cards[0] : cards[cardIndex + 1]);

        combinations[this.userId] = currentCombinations;
        actions[this.userId] = { timestamp: new Date().getTime(), cardIndex: index };

        Games.update({
          users: this.userId,
          isFinished: { $ne: true },
        }, {
          $set: { combinations, actions },
        });
      }
    }
  },
});

export const openCards = new ValidatedMethod({
  name: 'games.openCards',
  validate: null,
  run() {
    if (!this.userId) {
      throw new Meteor.Error('games.openCards', 'Must be logged in to open cards');
    }

    const game = Games.findOne({ users: this.userId, isFinished: { $ne: true } });

    if (!game) {
      throw new Meteor.Error('games.openCards', 'Couldn\'t find current game');
    }

    if ((game.waitingUsers || []).includes(this.userId)) {
      throw new Meteor.Error('games.openCards', 'The user is already on wait');
    }

    const opponentReady = (game.waitingUsers || []).length > 0;

    Games.update(game._id, {
      $push: { waitingUsers: this.userId },
      $set: { combinationsOpened: opponentReady ? game.combinations : {} },
    });

    if (opponentReady) {
      const ids = Object.keys(game.combinations);
      const winners = [];
      const rewards = {
        [ids[0]]: 0,
        [ids[1]]: 0,
      };

      for (let i = 0; i <= 2; i += 1) {
        const cardOfFirstUser = game.combinations[ids[0]][i];
        const cardOfSecondUser = game.combinations[ids[1]][i];
        const compareResult = compare(cardOfFirstUser, cardOfSecondUser);

        if (!compareResult) {
          winners.push(null);
        }
        if (compareResult && compareResult === cardOfFirstUser) {
          winners.push(ids[0]);
          rewards[ids[0]] += 5;
        }
        if (compareResult && compareResult === cardOfSecondUser) {
          winners.push(ids[1]);
          rewards[ids[1]] += 5;
        }
      }

      const r = groupBy(winners, i => i);
      const victoriesOfFirstPlayer = r[ids[0]] && r[ids[0]].length ? r[ids[0]].length : 0;
      const victoriesOfSecondPlayer = r[ids[1]] && r[ids[1]].length ? r[ids[1]].length : 0;

      const history = {
        gameId: game._id,
        winnerId: null,
        winners,
        combinations: game.combinations,
        rewards: {},
      };

      if (victoriesOfFirstPlayer > victoriesOfSecondPlayer) {
        const winnerId = ids[0];
        history.winnerId = winnerId;
        rewards[winnerId] += victoriesOfFirstPlayer === 3 ? 15 : 10;
      }
      if (victoriesOfSecondPlayer > victoriesOfFirstPlayer) {
        const winnerId = ids[1];
        history.winnerId = winnerId;
        rewards[winnerId] += victoriesOfSecondPlayer === 3 ? 15 : 10;
      }

      history.rewards = rewards;

      History.insert(history);
    }
  },
});

export const endGame = new ValidatedMethod({
  name: 'games.endGame',
  validate: null,
  run() {
    if (!this.userId) {
      throw new Meteor.Error('games.openCards', 'Must be logged in to end game');
    }

    const game = Games.findOne({ users: this.userId, isFinished: { $ne: true } });

    if (game && game.combinationsOpened) {
      Games.update({ users: this.userId }, { $set: { isFinished: true } });
      Users.update(this.userId, { $set: { status: statuses.default } });
    }
  },
});
