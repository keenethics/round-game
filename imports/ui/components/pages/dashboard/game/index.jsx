import React from 'react';
import PropTypes from 'prop-types';

import Card from '/imports/ui/components/pages/dashboard/game/card';

const Game = ({ combination }) => (
  <div className="table">
    <div className="opponent">
      <Card readOnly />
      <Card readOnly />
      <Card readOnly />
    </div>
    <input type="button" value="I'm ready" />
    <div className="user">
      <Card value={combination[0]} />
      <Card value={combination[1]} />
      <Card value={combination[2]} />
    </div>
  </div>
);

Game.propTypes = {
  combination: PropTypes.array,
};
Game.defaultProps = {
  combination: ['rock', 'rock', 'rock'],
};

export default Game;
