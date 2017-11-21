import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import nanoid from 'nanoid';

import Queue from '/imports/api/queue/queue';

export const runSearch = new ValidatedMethod({
  name: 'queue.runSearch',
  validate: null,
  run() {
    if (!this.userId) {
      throw new Meteor.Error('queue.getInLine', 'Must be logged in to search for opponents');
    }
    if (Queue.find({ userId: this.userId }).count()) {
      throw new Meteor.Error('queue.getInLine', 'You can\'t start searching now');
    }

    const userInSearch = { userId: this.userId };
    const opponentsInSearch = Queue.find(
      { status: 'search' },
      { _id: 0, userId: 1 },
    ).map(doc => doc.userId);

    if (opponentsInSearch.length === 1) {
      const roomId = nanoid();

      userInSearch.status = 'pending';
      userInSearch.roomId = roomId;

      Queue.update({ userId: { $in: opponentsInSearch } }, { $set: { status: 'pending', roomId } });
    }

    Queue.insert(userInSearch);
  },
});

export const userReady = new ValidatedMethod({
  name: 'queue.userReady',
  validate: null,
  run() {
    if (!this.userId) {
      throw new Meteor.Error('queue.getInLine', 'Must be logged in for this action');
    }

    Queue.update({ userId: this.userId }, { $set: { status: 'ready' } });
  },
});

export const stopSearch = new ValidatedMethod({
  name: 'queue.stopSearch',
  validate: null,
  run() {
    if (!this.userId) {
      throw new Meteor.Error('queue.getInLine', 'Must be logged in to stop search');
    }

    Queue.remove({ userId: this.userId });
  },
});
