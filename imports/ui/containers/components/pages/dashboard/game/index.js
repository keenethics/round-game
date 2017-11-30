import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Games from '/imports/api/games';

import Game from '/imports/ui/components/pages/dashboard/game/index';

export default withTracker(() => {
  const gameHandle = Meteor.subscribe('games.current');
  const isReady = gameHandle.ready();

  const game = isReady ? Games.findOne({
    users: Meteor.userId(), isFinished: { $ne: true },
  }) : {};

  if (game && game.users) {
    const opponentId = game.users && game.users.find(id => id !== Meteor.userId());
    const opponentsCombination = ((game && game.combinationsOpened) || {})[opponentId];

    return {
      isReady,
      game,
      opponentsCombination,
    };
  }

  return {
    isReady,
    game,
  };
})(Game);
