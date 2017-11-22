import React from 'react';
import PropTypes from 'prop-types';

import { statuses } from '/imports/helpers/types';

const Actions = ({ user, startSearch, cancelSearch }) => (
  <div className="dashboard-actions">
    {user.status === statuses.default && <input type="button" value="Search" onClick={startSearch} />}
    {user.status === statuses.search && <input type="button" className="red" value="Cancel" onClick={cancelSearch} />}
  </div>
);

Actions.propTypes = {
  user: PropTypes.object,
  startSearch: PropTypes.func,
  cancelSearch: PropTypes.func,
};
Actions.defaultProps = {
  user: {},
  startSearch: null,
  cancelSearch: null,
};

export default Actions;
