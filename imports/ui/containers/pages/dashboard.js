import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Queue from '/imports/api/queue/queue';

import Dashboard from '/imports/ui/pages/dashboard';

export default withTracker(() => {
  const statusHandle = Meteor.subscribe('queue.searchStatus');
  const isReady = statusHandle.ready();
  const user = isReady ? Queue.findOne({ userId: Meteor.userId() }) : {};

  if (user && user.roomId) {
    const room = isReady ? Queue.find({ roomId: user.roomId }).fetch() : [];

    return {
      isReady,
      user,
      room,
    };
  }

  return {
    isReady,
    user,
  };
})(Dashboard);
