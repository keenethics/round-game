import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Dashboard from '/imports/ui/pages/dashboard';

export default withTracker(() => {
  const userHandle = Meteor.subscribe('users.current');
  const user = userHandle.ready() ? Meteor.users.findOne(Meteor.userId()) : {};

  return {
    isReady: userHandle.ready(),
    user,
  };
})(Dashboard);
