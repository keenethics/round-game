import { Meteor } from 'meteor/meteor';

const flipCard = ({ index }) => Meteor.call('games.flipCard', { index });

export default flipCard;
