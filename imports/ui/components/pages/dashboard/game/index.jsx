import { Meteor } from 'meteor/meteor';

import React from 'react';
import PropTypes from 'prop-types';

import { openCards, endGame } from '/imports/api/games/actions';

import Card from '/imports/ui/components/pages/dashboard/game/card';
import OpponentCards from '/imports/ui/components/pages/dashboard/game/opponent-cards';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = { opponentsCombination: props.opponentsCombination };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ opponentsCombination: nextProps.opponentsCombination });
  }
  render() {
    const {
      combination,
      actions,
      isWaiting,
      history,
    } = this.props;

    if (!combination.length) return null;

    return (
      <div className="table">
        <OpponentCards combination={this.state.opponentsCombination} actions={actions} />
        {isWaiting || <input type="button" value="I'm ready" onClick={openCards} />}
        {(isWaiting && !history.gameId) && <input type="button" value="Waiting..." disabled />}
        {!!history.gameId && <input type="button" className="red" value="Close" onClick={endGame} />}
        <div className="user">
          {combination.map((value, index) => {
            const key = `card${index}`;

            return <Card key={key} index={index} value={value} isWaiting={isWaiting} />;
          })}
        </div>
        {history.gameId ? (
          <div className="result">
            {!!history.winnerId || (
              <h2>In a draw</h2>
            )}
            {history.winnerId && history.winnerId === Meteor.userId() ? (
              <h2 className="winner">Winner</h2>
            ) : (
              <h2 className="looser">Looser</h2>
            )}
            <p>Your reward: {history.rewards[Meteor.userId()]} points</p>
          </div>
        ) : null}
      </div>
    );
  }
}

Game.propTypes = {
  isWaiting: PropTypes.bool,
  combination: PropTypes.array,
  opponentsCombination: PropTypes.array,
  actions: PropTypes.object,
  history: PropTypes.object,
};
Game.defaultProps = {
  isWaiting: false,
  combination: [],
  opponentsCombination: [],
  actions: {},
  history: {},
};
