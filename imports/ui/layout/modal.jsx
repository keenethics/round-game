import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class ModalInner extends React.Component {
  constructor(props) {
    super(props);

    this.element = document.createElement('div');
    this.element.setAttribute('class', 'modal');
  }
  componentDidMount() {
    document.body.classList.add('modal-open');
    document.body.appendChild(this.element);
  }
  componentWillUnmount() {
    document.body.classList.remove('modal-open');
    document.body.removeChild(this.element);
  }
  render() {
    const { children } = this.props;

    return ReactDOM.createPortal(children, this.element);
  }
}

ModalInner.propTypes = {
  children: PropTypes.array,
};
ModalInner.defaultProps = {
  children: [],
};

const Modal = ({ children, isOpen, onClose }) => {
  if (isOpen) {
    return (
      <ModalInner>
        <button className="close-modal" onClick={onClose}>&times;</button>
        <div className="modal-container">
          {children}
        </div>
      </ModalInner>
    );
  }

  return null;
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.element,
    PropTypes.array,
  ]),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
Modal.defaultProps = {
  children: null,
  isOpen: false,
  onClose: null,
};

export default Modal;
