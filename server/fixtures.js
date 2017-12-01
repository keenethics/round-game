import { Meteor } from 'meteor/meteor';

import Users from '/imports/api/users';

import { statuses } from '/imports/helpers/types';

Meteor.startup(() => {
  if (!Users.find({ username: 'bot' }).count()) {
    Users.insert({
      username: 'bot',
      email: 'bot@bot.bot',
      password: 'botpassword',
      status: statuses.game,
    });
  }
});
