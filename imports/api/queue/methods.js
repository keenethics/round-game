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

    const userInSearch = { userId: this.userId };
    const opponentsInSearch = Queue.find(
      { status: 'search' },
      { _id: 0, userId: 1 },
    ).map(doc => doc.userId);

    if (opponentsInSearch.length === 3) {
      const roomId = nanoid();

      userInSearch.status = 'pending';
      userInSearch.roomId = roomId;

      Queue.update({ userId: { $in: opponentsInSearch } }, { $set: { status: 'pending', roomId } });
    }

    Queue.insert(userInSearch);
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
