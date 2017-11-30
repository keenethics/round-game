import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const History = new Mongo.Collection('history');

History.schema = new SimpleSchema({
  gameId: {
    type: String,
  },
  winnerId: {
    type: String,
    optional: true,
  },
  combinations: {
    type: Object,
    blackbox: true,
    optional: true,
  },
  winners: {
    type: [String],
  },
  rewards: {
    type: Object,
    blackbox: true,
    optional: true,
  },
  createdAt: {
    type: Date,
    autoValue: () => new Date(),
  },
});

History.attachSchema(History.schema);

History.deny({
  insert() { return false; },
  update() { return false; },
  remove() { return false; },
});

export default History;
