import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Queue from '/imports/api/queue/queue';

import Opponents from '/imports/ui/components/pages/dashboard/opponents';

export default withTracker(() => {
  const opponentsHandle = Meteor.subscribe('queue.opponents');
  const isReady = opponentsHandle.ready();
  const opponents = isReady ? Queue.find({ status: 'search', userId: { $ne: Meteor.userId() } }).fetch() : [];

  return {
    isReady,
    opponents,
  };
})(Opponents);
