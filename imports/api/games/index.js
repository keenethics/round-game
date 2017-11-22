import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Games = new Mongo.Collection('games');

Games.deny({
  insert() { return false; },
  update() { return false; },
  remove() { return false; },
});

Games.schema = new SimpleSchema({
  users: {
    type: [String],
  },
  isFinished: {
    type: Boolean,
    optional: true,
  },
  createdAt: {
    type: Date,
    autoValue: () => new Date(),
  },
});

Games.attachSchema(Games.schema);

export default Games;
