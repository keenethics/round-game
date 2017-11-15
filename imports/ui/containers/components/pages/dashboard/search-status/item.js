import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Item from '/imports/ui/components/pages/dashboard/search-status/item';

export default withTracker(({ user }) => {
  if (!user || !user.userId) {
    return {
      isReady: true,
      user: {},
    };
  }

  const userHandle = Meteor.subscribe('users.byId', user.userId);
  const isReady = userHandle.ready();
  const userInformation = isReady ? Meteor.users.findOne(user.userId) : {};

  return {
    isReady,
    user: {
      ...user,
      information: userInformation,
    },
  };
})(Item);
