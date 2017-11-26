import React from 'react';
import PropTypes from 'prop-types';
import Games from '/imports/api/games';

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    const nonSelectedChoices = Games.choices.filter(val => val !== props.value);

    this.state = {
      isFlipped: false,
      front: props.readOnly ? 'background' : props.value,
      back: props.readOnly ? 'background' : nonSelectedChoices[0],
      hidden: props.readOnly ? 'background' : nonSelectedChoices[1],
      readOnly: props.readOnly,
    };

    this.flip = this.flip.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const nonSelectedChoices = Games.choices.filter(val => val !== nextProps.value);

    this.setState({
      front: nextProps.readOnly ? 'background' : nextProps.value,
      back: nextProps.readOnly ? 'background' : nonSelectedChoices[0],
      hidden: nextProps.readOnly ? 'background' : nonSelectedChoices[1],
      readOnly: nextProps.readOnly,
    });
  }
  flip () {
    if (this.state.readOnly) return;
    this.setState({
      isFlipped: !this.state.isFlipped,
    });

    const invisibleSide = this.state.isFlipped ? 'back' : 'front';
    setTimeout(() => this.setState({
      [invisibleSide]: this.state.hidden,
      hidden: this.state[invisibleSide],
    }), 400);
  }
  render() {
    const { isFlipped, front, back } = this.state;

    return (
      <div className={isFlipped ? 'card flipped' : 'card'} onClick={this.flip} role="presentation">
        <figure className="front">
          <img src={`/cards/${front}.png`} width="80" height="100" alt={front} />
        </figure>
        <figure className="back">
          <img src={`/cards/${back}.png`} width="80" height="100" alt={back} />
        </figure>
      </div>
    );
  }
}

Card.propTypes = {
  value: PropTypes.string,
  readOnly: PropTypes.bool,
};
Card.defaultProps = {
  value: 'rock',
  readOnly: false,
};
