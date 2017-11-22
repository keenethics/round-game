import React from 'react';

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlipped: false,
    };

    this.flip = this.flip.bind(this);
  }
  flip () {
    this.setState({
      isFlipped: !this.state.isFlipped,
    });
  }
  render() {
    const { isFlipped } = this.state;

    return (
      <div className={isFlipped ? 'card flipped' : 'card'} onClick={this.flip} role="presentation">
        <figure className="front">
          <img src="/cards/scissors.png" width="80" height="100" alt="paper" />
        </figure>
        <figure className="back">
          <img src="/cards/paper.png" width="80" height="100" alt="paper" />
        </figure>
      </div>
    );
  }
}
