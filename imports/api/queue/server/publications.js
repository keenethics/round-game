/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { publishComposite } from 'meteor/reywood:publish-composite';
// import { check } from 'meteor/check';

import Queue from '/imports/api/queue/queue';

Meteor.publish('queue.opponents', function publish() {
  return Queue.find({ status: 'search', userId: { $ne: this.userId } });
});

publishComposite('queue.searchStatus', {
  find() {
    return Queue.find({ userId: this.userId });
  },
  children: [
    {
      find({ roomId }) {
        return Queue.find({ roomId });
      },
    },
  ],
});
