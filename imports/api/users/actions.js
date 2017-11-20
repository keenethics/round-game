import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

export const signin = (user, password) => {
  check(user, String);
  check(password, String);

  Meteor.loginWithPassword(user, password);
};
export const signup = (username, email, password) => {
  check(username, String);
  check(email, String);
  check(password, String);

  Accounts.createUser({ username, email, password });
};
export const startSearch = () => Meteor.call('user.startSearch');
export const cancelSearch = () => Meteor.call('user.cancelSearch');
export const logout = () => Meteor.logout();
