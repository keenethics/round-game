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
    const opponents = [<Item key={nanoid()} user={user} />];

    for (let i = 0; i < 3; i += 1) {
      const opponent = this.props.opponents[i];

      opponents.push(<Item key={nanoid()} user={opponent || null} />);
    }

    return opponents;
  }
  render() {
    const { user, opponents } = this.props;

    if (!user || !opponents) return null;
    if (!user.status) return null;

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
