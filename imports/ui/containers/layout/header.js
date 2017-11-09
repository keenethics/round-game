import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Header from '/imports/ui/layout/header';

export default withTracker(() => {
  const userId = Meteor.userId();

  return {
    userId,
  };
})(Header);
