import React from 'react';

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlipped: false,
      front: 'rock',
      back: 'scissors',
      hidden: 'paper',
    };

    this.flip = this.flip.bind(this);
  }
  flip () {
    this.setState({
      isFlipped: !this.state.isFlipped,
    });

    const invisibleSide = this.state.isFlipped ? 'back' : 'front';
    setTimeout(() => this.setState({
      [invisibleSide]: this.state.hidden,
      hidden: this.state[invisibleSide],
    }), 200);
  }
  render() {
    const { isFlipped } = this.state;

    return (
      <div className={isFlipped ? 'card flipped' : 'card'} onClick={this.flip} role="presentation">
        <figure className="front">
          <img src={`/cards/${this.state.front}.png`} width="80" height="100" alt={this.state.front} />
        </figure>
        <figure className="back">
          <img src={`/cards/${this.state.back}.png`} width="80" height="100" alt={this.state.back} />
        </figure>
      </div>
    );
  }
}
