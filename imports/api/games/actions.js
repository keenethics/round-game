import { Meteor } from 'meteor/meteor';

export const runSearch = () => Meteor.call('queue.runSearch');
export const userReady = () => Meteor.call('queue.userReady');
export const stopSearch = () => Meteor.call('queue.stopSearch');
