import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { cards } from '/imports/helpers/types';

const Games = new Mongo.Collection('games');

const combinationsAutoValue = (context) => {
  if (context.isInsert) {
    return {
      [context.field('users').value[0]]: Games.randomCombination(),
      [context.field('users').value[1]]: Games.randomCombination(),
    };
  }

  return context.value;
};
const actionsAutoValue = (context) => {
  if (context.isInsert) {
    return {
      [context.field('users').value[0]]: {
        timestamp: null,
        index: null,
      },
      [context.field('users').value[1]]: {
        timestamp: null,
        index: null,
      },
    };
  }

  return context.value;
};
const isFinishedAutoValue = (context) => {
  if (context.isInsert) {
    return {
      [context.field('users').value[0]]: false,
      [context.field('users').value[1]]: false,
    };
  }

  return context.value;
};
const createdAtAutoValue = (context) => {
  if (context.isInsert) {
    return new Date();
  }

  return context.value;
};

Games.deny({
  insert() { return false; },
  update() { return false; },
  remove() { return false; },
});

Games.schema = new SimpleSchema({
  users: {
    type: [String],
  },
  combinations: {
    type: Object,
    blackbox: true,
    optional: true,
    autoValue() { return combinationsAutoValue(this); },
  },
  combinationsOpened: {
    type: Object,
    blackbox: true,
    optional: true,
  },
  actions: {
    type: Object,
    blackbox: true,
    optional: true,
    autoValue() { return actionsAutoValue(this); },
  },
  waitingUsers: {
    type: [String],
    optional: true,
  },
  isFinished: {
    type: Object,
    blackbox: true,
    optional: true,
    autoValue() { return isFinishedAutoValue(this); },
  },
  createdAt: {
    type: Date,
    autoValue() { return createdAtAutoValue(this); },
  },
});

Games.attachSchema(Games.schema);

Games.randomCombination = () => [
  cards[Math.floor(Math.random() * 3)],
  cards[Math.floor(Math.random() * 3)],
  cards[Math.floor(Math.random() * 3)],
];

export default Games;
