import React from 'react';
import PropTypes from 'prop-types';

import Card from '/imports/ui/components/pages/dashboard/game/card';
import OpponentCards from '/imports/ui/components/pages/dashboard/game/opponent-cards';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { combination, actions } = this.props;

    if (!combination.length) return null;

    return (
      <div className="table">
        <OpponentCards actions={actions} />
        <input type="button" value="I'm ready" />
        <div className="user">
          {combination.map((value, index) => {
            const key = `card${index}`;

            return <Card key={key} index={index} value={value} />;
          })}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  combination: PropTypes.array,
  actions: PropTypes.object,
};
Game.defaultProps = {
  combination: [],
  actions: {},
};
