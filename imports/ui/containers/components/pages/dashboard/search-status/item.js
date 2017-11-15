import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Item from '/imports/ui/components/pages/dashboard/search-status/item';

export default withTracker(({ userId }) => {
  if (!userId) {
    return {
      isReady: true,
      user: null,
    };
  }

  const userHandle = Meteor.subscribe('users.byId', userId);
  const isReady = userHandle.ready();
  const user = isReady ? Meteor.users.findOne(userId) : {};

  return {
    isReady,
    user,
  };
})(Item);
