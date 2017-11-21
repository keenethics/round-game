import React from 'react';
import PropTypes from 'prop-types';

const Users = ({ user, opponent }) => (
  <div className="dashboard-users">
    <div className="user">
      <div className="avatar">
        <img src="/usernamus.jpg" width="60" height="60" alt="avatar" />
      </div>
      <div className="username">{user.username}</div>
    </div>
    {opponent && (
      <div className="opponent">
        <div className="avatar">
          <img src="/usernamus.jpg" width="60" height="60" alt="avatar" />
        </div>
        <div className="username">{opponent.username}</div>
      </div>
    )}
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
