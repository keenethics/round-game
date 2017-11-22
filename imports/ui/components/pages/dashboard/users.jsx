import React from 'react';
import PropTypes from 'prop-types';

const Users = ({ user, opponent }) => (
  <div className="dashboard-users">
    <div className="user">
      <div className="avatar">
        <img src="/usernamus.jpg" alt="avatar" />
      </div>
      <div className="username">{user.username}</div>
    </div>
    <div className="opponent">
      {opponent && [
        <div className="avatar" key="avatar">
          <img src="/usernamus.jpg" alt="avatar" />
        </div>,
        <div className="username" key="username">{opponent.username}</div>,
      ]}
    </div>
    <div className="versus">
      <div className="round">
        <span className="point" />
        <span className="point" />
        <span className="point win" />
        <span className="label">Round 1</span>
        <span className="point lose" />
        <span className="point" />
        <span className="point" />
      </div>
    </div>
  </div>
);

Users.propTypes = {
  user: PropTypes.object,
  opponent: PropTypes.object,
};
Users.defaultProps = {
  user: {},
  opponent: null,
};

export default Users;
