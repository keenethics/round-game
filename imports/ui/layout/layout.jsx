import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children, header, name }) => {
  const className = name ? `content content-${name.replace(' ', '-').toLowerCase()}` : 'content';

  return [
    header,
    <div key="content" className={className}>
      {children}
    </div>,
  ];
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.array,
    PropTypes.string,
    PropTypes.bool,
  ]),
  header: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]),
  name: PropTypes.string,
};
Layout.defaultProps = {
  children: null,
  header: null,
  name: null,
};

export default Layout;
