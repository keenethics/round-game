import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const startSearch = new ValidatedMethod({
  name: 'user.startSearch',
  validate: null,
  run() {
    if (!this.userId) {
      throw new Meteor.Error('user.startSearch', 'Must be logged in to start search');
    }
    if (Meteor.user().status) {
      throw new Meteor.Error('user.startSearch', 'You can\'t start searching now');
    }

    const opponent = Meteor.users.findOne({ status: 1 });

    if (opponent) {
      Meteor.users.update(opponent._id, { $set: { status: 2 } });
      Meteor.users.update(this.userId, { $set: { status: 2 } });
    } else {
      Meteor.users.update(this.userId, { $set: { status: 1 } });
    }
  },
});

export const cancelSearch = new ValidatedMethod({
  name: 'user.cancelSearch',
  validate: null,
  run() {
    if (!this.userId) {
      throw new Meteor.Error('user.cancelSearch', 'Must be logged in to cancel search');
    }
    if (Meteor.user().status) {
      throw new Meteor.Error('user.cancelSearch', 'You can\'t cancel search now');
    }

    Meteor.users.update(this.userId, { $set: { status: 0 } });
  },
});
