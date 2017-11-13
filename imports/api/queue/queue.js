import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Queue = new Mongo.Collection('queue');

Queue.deny({
  insert() { return false; },
  update() { return false; },
  remove() { return false; },
});

Queue.schema = new SimpleSchema({
  userId: {
    type: String,
  },
  status: {
    type: String,
    allowedValues: ['search', 'pending', 'ready'],
    defaultValue: 'search',
  },
  roomId: {
    type: String,
    optional: true,
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
});

Queue.attachSchema(Queue.schema);

export default Queue;
