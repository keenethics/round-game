import { Meteor } from 'meteor/meteor';

import React from 'react';
import PropTypes from 'prop-types';
import { reverse } from 'lodash';
import nanoid from 'nanoid';

const Users = ({ user, opponent, history }) => (
  <div className="dashboard-users">
    <div className="user">
      <div className="avatar">
        {user.username.charAt(0)}
      </div>
      <div className="username">{user.username}</div>
    </div>
    <div className="opponent">
      {opponent && [
        <div className="avatar" key="avatar">
          {opponent.username.charAt(0)}
        </div>,
        <div className="username" key="username">{opponent.username}</div>,
      ]}
    </div>
    <div className="versus">
      <div className="round">
        {history.winners && history.winners.map((w) => {
          if (w && w === Meteor.userId()) return <span key={nanoid()} className="point win" />;
          if (w && w !== Meteor.userId()) return <span key={nanoid()} className="point lose" />;

          return <span key={nanoid()} className="point" />;
        })}
        {history.winners ? '' : [
          <span key={nanoid()} className="point" />,
          <span key={nanoid()} className="point" />,
          <span key={nanoid()} className="point" />,
        ]}
        <span className="label">vs</span>
        {history.winners && reverse(history.winners).map((w) => {
          if (w && w !== Meteor.userId()) return <span key={nanoid()} className="point win" />;
          if (w && w === Meteor.userId()) return <span key={nanoid()} className="point lose" />;

          return <span key={nanoid()} className="point" />;
        })}
        {history.winners ? '' : [
          <span key={nanoid()} className="point" />,
          <span key={nanoid()} className="point" />,
          <span key={nanoid()} className="point" />,
        ]}
      </div>
    </div>
  </div>
);

Users.propTypes = {
  user: PropTypes.object,
  opponent: PropTypes.object,
  history: PropTypes.object,
};
Users.defaultProps = {
  user: {},
  opponent: null,
  history: {},
};

export default Users;
