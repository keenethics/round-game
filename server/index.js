import { Meteor } from 'meteor/meteor';
import { BrowserPolicy } from 'meteor/browser-policy';

import '/server/account';
import '/imports/startup/server/index';

Meteor.startup(() => {
  BrowserPolicy.framing.allowAll();
});
