import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import Games from '/imports/api/games';
import { cards } from '/imports/helpers/types';

const flipCard = new ValidatedMethod({
  name: 'games.flipCard',
  validate: new SimpleSchema({
    index: { type: Number },
  }).validator(),
  run({ index }) {
    if (!this.userId) {
      throw new Meteor.Error('games.flipCard', 'Must be logged in to flip card');
    }

    const game = Games.findOne({ users: this.userId, isFinished: { $ne: true } });

    if (game && game.currentBids && game.currentBids[this.userId]) {
      const { currentBids } = game;
      const currentBid = currentBids[this.userId];
      const cardIndex = cards.indexOf(currentBid[index]);

      if (cardIndex > -1) {
        currentBid.splice(index, 1, (cardIndex + 1) > 2 ? cards[0] : cards[cardIndex + 1]);

        currentBids[this.userId] = currentBid;

        Games.update({
          users: this.userId,
          isFinished: { $ne: true },
        }, {
          $set: { currentBids },
        });
      }
    }
  },
});

export default flipCard;
