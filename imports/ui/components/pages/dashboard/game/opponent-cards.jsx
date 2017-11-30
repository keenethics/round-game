import React from 'react';
import PropTypes from 'prop-types';

import Card from '/imports/ui/components/pages/dashboard/game/card';

export default class OpponentCards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flippedCardIndex: props.actions.cardIndex,
      combination: props.combination || [],
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ combination: nextProps.combination });

    if (nextProps.actions.timestamp !== this.props.actions.timestamp) {
      this.setState({
        flippedCardIndex: nextProps.actions.cardIndex,
      });
    }
  }
  render() {
    const { flippedCardIndex, combination } = this.state;
    const { actions } = this.props;

    return (
      <div className="opponent">
        {[0, 1, 2].map(i => (
          <Card
            key={`${actions.timestamp}${i}`}
            animate={flippedCardIndex === i}
            value={combination[i]}
            isOpponentSide
          />
        ))}
      </div>
    );
  }
}

OpponentCards.propTypes = {
  actions: PropTypes.object,
  combination: PropTypes.array,
};
OpponentCards.defaultProps = {
  actions: {},
  combination: [],
};
