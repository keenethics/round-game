/* global TimeSync */

import { Meteor } from 'meteor/meteor';

import React from 'react';
import { render } from 'react-dom';

import Routes from '/imports/ui/routes/routes';

Meteor.startup(() => {
  TimeSync.loggingEnabled = false;

  render(<Routes />, document.getElementById('game'));
});
