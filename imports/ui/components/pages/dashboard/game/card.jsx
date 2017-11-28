import React from 'react';
import PropTypes from 'prop-types';

import flipCard from '/imports/api/games/actions';

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlipped: false,
      cardImage: props.value,
      rocking: props.animate,
    };

    this.animatingDone = this.animatingDone.bind(this);
  }
  componentDidMount() {
    if (this.opponentCard) {
      this.opponentCard.addEventListener('animationend', this.animatingDone);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        isFlipped: !this.state.isFlipped,
        cardImage: nextProps.value,
        rocking: nextProps.animate,
      });
    }
  }
  componentWillUnmount() {
    if (this.opponentCard) {
      this.opponentCard.removeEventListener('animationend', this.animatingDone);
    }
  }
  animatingDone() {
    this.setState({
      rocking: false,
    });
  }
  render() {
    const { index, value } = this.props;
    const { isFlipped, cardImage, rocking } = this.state;

    if (!value) {
      return (
        <div ref={(c) => { this.opponentCard = c; }} className={rocking ? 'card rocking' : 'card'}>
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
  animate: PropTypes.bool,
};
Card.defaultProps = {
  index: 0,
  value: '',
  animate: false,
};
