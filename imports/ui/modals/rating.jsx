import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';

import Layout from '/imports/ui/layout/layout';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const {
      isReady,
      position,
      user,
      users,
    } = this.props;

    if (!isReady) return null;

    return (
      <Layout name="rating">
        {users.map((u, i) => (
          <div className="rating-item" key={nanoid()}>
            <div className="position">{i + 1}</div>
            <div className="username">{u.username}</div>
            <div className="points">Points: {u.points}</div>
          </div>
        ))}
        {user && user.username ? (
          <Fragment>
            <div className="rating-separate">...</div>
            <div className="rating-item">
              <div className="position">{position}</div>
              <div className="username">{user.username}</div>
              <div className="points">Points: {user.points + 1}</div>
            </div>
          </Fragment>
        ) : null}
      </Layout>
    );
  }
}

Landing.propTypes = {
  isReady: PropTypes.bool,
  position: PropTypes.number,
  user: PropTypes.object,
  users: PropTypes.array,
};
Landing.defaultProps = {
  isReady: false,
  position: 0,
  user: {},
  users: [],
};
