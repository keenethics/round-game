import React from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';

export default class Opponents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.getOpponents = this.getOpponents.bind(this);
  }
  getOpponents() {
    const opponents = [];

    for (let i = 0; i < 4; i += 1) {
      if (this.props.opponents[i]) {
        opponents.push(<div key={nanoid()} className="opponent in-search" />);
      } else {
        opponents.push(<div key={nanoid()} className="opponent" />);
      }
    }

    return opponents;
  }
  render() {
    const { isReady } = this.props;

    if (!isReady) return null;

    return (
      <div className="opponents">
        {this.getOpponents()}
      </div>
    );
  }
}

Opponents.propTypes = {
  isReady: PropTypes.bool,
  opponents: PropTypes.array,
};
Opponents.defaultProps = {
  isReady: false,
  opponents: [],
};
