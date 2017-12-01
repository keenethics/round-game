import { Meteor } from 'meteor/meteor';

import React from 'react';
import PropTypes from 'prop-types';

import { openCards, endGame } from '/imports/api/games/actions';

import Card from '/imports/ui/components/pages/dashboard/game/card';
import OpponentCards from '/imports/ui/components/pages/dashboard/game/opponent-cards';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opponentsCombination: props.opponentsCombination,
      countdown: 30,
    };
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      const dt = new Date(this.props.countdown);
      const now = new Date();
      const seconds = Math.floor((now.getTime() - dt.getTime()) / 1000);

      if (seconds > 30) {
        clearInterval(this.timer);
      }
      if (seconds <= 30) {
        this.setState({
          countdown: seconds,
        });
      }
    }, 1000);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ opponentsCombination: nextProps.opponentsCombination });
  }
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
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
        {isWaiting || (
          <div className="progress">
            <input type="button" value="I'm ready" onClick={openCards} />
            <div className="scale" style={{ width: `${(this.state.countdown / 30) * 100}%` }} />
          </div>
        )}
        {(isWaiting && !history.gameId) && (
          <input
            type="button"
            value={`Waiting ${30 - this.state.countdown}...`}
            disabled
          />
        )}
        {!!history.gameId && <input type="button" className="red" value="Close" onClick={endGame} />}
        <div className="user">
          {combination.map((value, index) => {
            const key = `card${index}`;

            return <Card key={key} index={index} value={value} isWaiting={isWaiting} />;
          })}
        </div>
        {history.gameId ? (
          <div className="result">
            {!history.winnerId ? <h2>In a draw</h2> : null}
            {history.winnerId && history.winnerId === Meteor.userId() ? (
              <h2 className="winner">Winner</h2>
            ) : null}
            {history.winnerId && history.winnerId !== Meteor.userId() ? (
              <h2 className="looser">Looser</h2>
            ) : null}
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
  countdown: PropTypes.object,
};
Game.defaultProps = {
  isWaiting: false,
  combination: [],
  opponentsCombination: [],
  actions: {},
  history: {},
  countdown: null,
};
