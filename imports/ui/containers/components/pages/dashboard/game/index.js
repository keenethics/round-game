import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Games from '/imports/api/games';
import History from '/imports/api/history';

import Game from '/imports/ui/components/pages/dashboard/game/index';

export default withTracker(() => {
  const gameHandle = Meteor.subscribe('games.current');
  const isReady = gameHandle.ready();

  const game = isReady ? Games.findOne({
    users: Meteor.userId(), [`isFinished.${this.userId}`]: { $ne: true },
  }) : {};

  if (game && game.users) {
    const opponentId = game.users && game.users.find(id => id !== Meteor.userId());
    const opponentsCombination = ((game && game.combinationsOpened) || {})[opponentId];

    const historyHandle = Meteor.subscribe('history.byGameId', game._id);
    const history = historyHandle.ready() ? History.findOne({ gameId: game._id }) : {};

    return {
      isReady,
      game,
      opponentsCombination,
      history,
    };
  }

  return {
    isReady,
    game,
  };
})(Game);
