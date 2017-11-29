import { Meteor } from 'meteor/meteor';

export const flipCard = ({ index }) => Meteor.call('games.flipCard', { index });
export const openCards = () => Meteor.call('games.openCards');
