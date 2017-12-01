import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import Users from '/imports/api/users';
import Games from '/imports/api/games';

import { statuses } from '/imports/helpers/types';

export const startSearch = new ValidatedMethod({
  name: 'user.startSearch',
  validate: null,
  run() {
    if (!this.userId) {
      throw new Meteor.Error('user.startSearch', 'Must be logged in to start search');
    }
    if (Meteor.user().status) {
      throw new Meteor.Error('user.startSearch', 'You can\'t start searching now');
    }

    const opponent = Meteor.users.findOne({ status: statuses.search });

    if (opponent) {
      Users.update(
        { _id: { $in: [opponent._id, this.userId] } },
        { $set: { status: statuses.game } },
        { multi: true },
      );
      const gameId = Games.insert({ users: [opponent._id, this.userId] });

      Meteor.setTimeout(() => {
        const { isFinished } = Games.findOne(gameId);
        if (!isFinished[opponent._id]) {
          Meteor.call('games.openCards', { userId: opponent._id });
        }
        if (!isFinished[this.userId]) {
          Meteor.call('games.openCards', { userId: this.userId });
        }
      }, 30000);
    } else {
      Users.update(this.userId, { $set: { status: statuses.search } });
    }
  },
});

export const cancelSearch = new ValidatedMethod({
  name: 'user.cancelSearch',
  validate: null,
  run() {
    if (!this.userId) {
      throw new Meteor.Error('user.cancelSearch', 'Must be logged in to cancel search');
    }
    if (Meteor.user().status !== statuses.search) {
      throw new Meteor.Error('user.cancelSearch', 'You can\'t cancel search now');
    }

    Users.update(this.userId, { $set: { status: statuses.default } });
  },
});

export const resetAll = new ValidatedMethod({
  name: 'users.resetAll',
  validate: null,
  run() {
    if (Meteor.isProduction) {
      throw new Meteor.Error('user.cancelSearch', 'You can\'t call this method now');
    }

    Users.update({}, { $set: { status: statuses.default } }, { multi: true });
    Games.remove({});
    History.remove({});
  },
});
