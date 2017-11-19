import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import _ from 'lodash';

import Queue from '/imports/api/queue/queue';

import Dashboard from '/imports/ui/pages/dashboard';

export default withTracker(() => {
  const statusHandle = Meteor.subscribe('queue.searchStatus');
  const isReady = statusHandle.ready();
  const user = isReady ? Queue.findOne({ userId: Meteor.userId() }) : {};


  let opponents = [];

  if (user && user.roomId) {
    opponents = isReady ? Queue.find({
      roomId: user.roomId,
      userId: { $ne: Meteor.userId() },
    }).fetch() : [];
  }
  if (user && !user.roomId) {
    opponents = isReady ? Queue.find({
      status: 'search',
      userId: { $ne: Meteor.userId() },
    }).fetch() : [];
  }

  const readyToStart = user.status === 'ready'
    && opponents.length > 0 && _.every(opponents, ({ status }) => status === 'ready');

  return {
    isReady,
    user,
    opponents,
    readyToStart,
  };
})(Dashboard);
