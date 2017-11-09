import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Index from '/imports/ui/pages/index';

export default withTracker(() => {
  const userId = Meteor.userId();

  return {
    userId,
  };
})(Index);
