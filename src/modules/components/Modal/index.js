import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
`;

const Icon = styled.div`
  position: absolute;
  left: -60%;
  pointer-events: none;
  height: 100vh;
  width: 100vh;
  margin: 0;
  display: flex;
  align-items: center;

  & > div {
    margin: 0;
    animation: ${spin} 200s infinite linear;
  }
`;

const Inner = styled.div`
  background-color: #fff;
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.3),
    0px 0px 50px 0 rgba(0, 0, 0, 0.1);
  padding: 50px 50px;
  max-width: 90%;
  max-height: 100%;
  overflow: scroll;
`;

const Wrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      preventClose: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.stopClose = this.stopClose.bind(this);
  }

  handleClose(e, force = false) {
    e.stopPropagation();
    if (this.state.preventClose) {
      this.setState({
        preventClose: false
      });
      if (force) {
        this.props.close();
      }
    } else {
      this.props.close();
    }
  }

  stopClose(e) {
    e.stopPropagation();
    this.setState({
      preventClose: true
    });
  }

  render() {
    return (
      <Wrapper onClick={this.handleClose} key="1">
        {this.props.icon &&
          <Icon>
            {this.props.icon}
          </Icon>}
        <Inner onClick={this.stopClose}>
          {this.props.children}
        </Inner>
      </Wrapper>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  close: PropTypes.func.isRequired,
  icon: PropTypes.element
};

export default Modal;
