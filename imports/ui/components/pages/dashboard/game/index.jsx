import React from 'react';
import PropTypes from 'prop-types';

import { openCards } from '/imports/api/games/actions';

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
    } = this.props;

    if (!combination.length) return null;

    return (
      <div className="table">
        <OpponentCards combination={this.state.opponentsCombination} actions={actions} />
        {isWaiting || <input type="button" value="I'm ready" onClick={openCards} />}
        {isWaiting && <input type="button" value="Waiting..." disabled />}
        <div className="user">
          {combination.map((value, index) => {
            const key = `card${index}`;

            return <Card key={key} index={index} value={value} isWaiting />;
          })}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  isWaiting: PropTypes.bool,
  combination: PropTypes.array,
  opponentsCombination: PropTypes.array,
  actions: PropTypes.object,
};
Game.defaultProps = {
  isWaiting: false,
  combination: [],
  opponentsCombination: [],
  actions: {},
};
