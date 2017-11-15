/* eslint-disable prefer-arrow-callback */

import { publishComposite } from 'meteor/reywood:publish-composite';

import Queue from '/imports/api/queue/queue';

publishComposite('queue.searchStatus', {
  find() {
    return Queue.find({ userId: this.userId });
  },
  children: [
    {
      find({ roomId }) {
        if (roomId) {
          return Queue.find({ roomId, userId: { $ne: this.userId } });
        }

        return Queue.find({ status: 'search', userId: { $ne: this.userId } });
      },
    },
  ],
});
