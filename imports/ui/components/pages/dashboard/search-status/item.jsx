import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Item = ({ user }) => {
  const { information } = user;

  const itemClass = classNames({
    user: true,
    search: !!Object.keys(user).length,
    ready: user && user.status && user.status === 'ready',
  });

  return (
    <div className={itemClass}>
      {(information && information.status) && [
        <div key="username" className="username">{information.username}</div>,
        <div key="status" className="status">{information.status.online ? 'online' : 'offline'}</div>,
      ]}
    </div>
  );
};

Item.propTypes = {
  user: PropTypes.object,
};
Item.defaultProps = {
  user: null,
};

export default Item;
