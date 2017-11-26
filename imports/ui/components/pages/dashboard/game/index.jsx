import React from 'react';
import PropTypes from 'prop-types';

import Card from '/imports/ui/components/pages/dashboard/game/card';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { combination } = this.props;

    if (!combination.length) return null;

    return (
      <div className="table">
        <div className="opponent">
          <Card />
          <Card />
          <Card />
        </div>
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
};
Game.defaultProps = {
  combination: [],
};
