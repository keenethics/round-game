import React from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';

import Item from '/imports/ui/containers/components/pages/dashboard/search-status/item';

export default class SearchStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.getOpponents = this.getOpponents.bind(this);
  }
  getOpponents() {
    const { user } = this.props;
    const opponents = [<Item key={nanoid()} userId={user.userId} />];

    for (let i = 0; i < 3; i += 1) {
      const opponent = this.props.opponents[i];

      opponents.push(<Item key={nanoid()} userId={opponent && opponent.userId} />);
    }

    return opponents;
  }
  render() {
    const { user, opponents } = this.props;

    if (!user || !opponents) return null;

    return (
      <div className="search-status">
        {this.getOpponents()}
      </div>
    );
  }
}

SearchStatus.propTypes = {
  user: PropTypes.object,
  opponents: PropTypes.array,
};
SearchStatus.defaultProps = {
  user: {},
  opponents: [],
};
