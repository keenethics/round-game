import { Meteor } from 'meteor/meteor';

import React from 'react';
import PropTypes from 'prop-types';
import { reverse } from 'lodash';
import nanoid from 'nanoid';
import store from 'store';

import Modal from '/imports/ui/layout/modal';
import Rating from '/imports/ui/containers/modals/rating';

export default class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 0,
      modalIsOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }
  componentWillMount() {
    const fetchDate = store.get('Meteor.fetchPositionDate');

    if (!fetchDate || Math.floor((new Date().getTime() - fetchDate) / 1000) > 18000) {
      Meteor.call('user.position', {}, (err, res) => {
        if (err) throw new Meteor.Error('Users', 'user.position');

        this.setState({
          position: res + 1,
        });
        store.set('Meteor.fetchPositionDate', new Date().getTime());
        store.set('Meteor.userPosition', res);
      });
    } else {
      this.setState({
        position: store.get('Meteor.userPosition') + 1,
      });
    }
  }
  toggleModal(e) {
    e.preventDefault();

    this.setState({
      modalIsOpen: !this.state.modalIsOpen,
    });
  }
  render() {
    const { user, opponent, history } = this.props;
    const { position, modalIsOpen } = this.state;

    return (
      <div className="dashboard-users">
        <div className="user">
          <div className="avatar">
            {user.username.charAt(0)}
            <a href="/" onClick={this.toggleModal}>{position || 0}</a>
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
        <Modal isOpen={modalIsOpen} onClose={this.toggleModal}>
          <Rating position={position} />
        </Modal>
      </div>
    );
  }
}

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
