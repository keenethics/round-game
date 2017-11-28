import React from 'react';
import PropTypes from 'prop-types';

import Card from '/imports/ui/components/pages/dashboard/game/card';

export default class OpponentCards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flippedCardIndex: props.actions.cardIndex,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.actions.timestamp !== this.props.actions.timestamp) {
      this.setState({
        flippedCardIndex: nextProps.actions.cardIndex,
      });
    }
  }
  render() {
    const { flippedCardIndex } = this.state;
    const { actions } = this.props;

    return (
      <div className="opponent">
        <Card key={`${actions.timestamp}0`} animate={flippedCardIndex === 0} />
        <Card key={`${actions.timestamp}1`} animate={flippedCardIndex === 1} />
        <Card key={`${actions.timestamp}2`} animate={flippedCardIndex === 2} />
      </div>
    );
  }
}

OpponentCards.propTypes = {
  actions: PropTypes.object,
};
OpponentCards.defaultProps = {
  actions: {},
};
