import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = ({ userId }) => {
  if (!userId) return null;

  return (
    <div className="header">
      <div className="container">
        <Link to="/">Dashboard</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </div>
  );
};

Header.propTypes = {
  userId: PropTypes.string,
};
Header.defaultProps = {
  userId: '',
};

export default Header;
