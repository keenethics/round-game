import React from 'react';
import PropTypes from 'prop-types';

import flipCard from '/imports/api/games/actions';

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlipped: false,
      cardImage: props.value,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        isFlipped: !this.state.isFlipped,
        cardImage: nextProps.value,
      });
    }
  }
  render() {
    const { index, value } = this.props;
    const { isFlipped, cardImage } = this.state;

    if (!value) {
      return (
        <div className="card">
          <figure />
        </div>
      );
    }

    return (
      <div className={isFlipped ? 'card flipped' : 'card'} onClick={() => flipCard({ index })} role="presentation">
        <figure>
          <img src="/cards/rock.png" className={cardImage === 'rock' ? 'active' : ''} alt="rock" />
          <img src="/cards/scissors.png" className={cardImage === 'scissors' ? 'active' : ''} alt="scissors" />
          <img src="/cards/paper.png" className={cardImage === 'paper' ? 'active' : ''} alt="paper" />
        </figure>
      </div>
    );
  }
}

Card.propTypes = {
  index: PropTypes.number,
  value: PropTypes.string,
};
Card.defaultProps = {
  index: 0,
  value: '',
};
