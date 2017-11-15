import React from 'react';
import PropTypes from 'prop-types';

const Item = ({ user }) => (
  <div className={user ? 'user in-search' : 'user'}>
    {(user && user.status) && [
      <div key="username" className="username">{user.username}</div>,
      <div key="status" className="status">{user.status.online ? 'online' : 'offline'}</div>,
    ]}
  </div>
);

Item.propTypes = {
  user: PropTypes.object,
};
Item.defaultProps = {
  user: null,
};

export default Item;
