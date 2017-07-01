import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const KeyElement = styled.div`
  background: ${p => p.ebony ? (p.on ? `color(${p.theme.color.success} b(30%))` : p.theme.color.black) : p.on ? p.theme.color.success : p.theme.color.light};
  border: 1px solid ${p => p.theme.color.black};
  border-radius: 0 0 2px 2px;
  color: ${p => p.ebony ? p.theme.color.light : p.theme.color.black};
  display: inline-block;
  height: ${p => p.ebony ? '60' : '100'}%;
  margin-right: ${p => p.ebony ? '-8' : '-1'}px;
  margin-left: ${p => p.ebony ? '-8' : '0'}px;
  position: relative;
  vertical-align: top;
  width: ${p => p.ebony ? '16' : '20'}px;
  ${p => p.ebony ? 'z-index: 2;' : ''}
`;

class Key extends React.Component {
  constructor(props) {
    super(props);

    this.handleUp = this.handleUp.bind(this);
    this.toggleKey = this.toggleKey.bind(this);
  }

  handleUp() {
    if (!this.props.noUp) {
      this.toggleKey();
    }
  }

  toggleKey() {
    if (this.props.tone.velocity > 0) {
      this.props.keyUp(this.props.tone.id);
    } else {
      this.props.keyDown(this.props.tone.id);
    }
  }

  render() {
    return (
      <KeyElement
        ebony={this.props.tone.note.length > 1}
        on={this.props.tone.velocity > 0}
        onMouseDown={this.toggleKey}
        onMouseUp={this.handleUp}
      />
    );
  }
}

Key.propTypes = {
  keyDown: PropTypes.func.isRequired,
  keyUp: PropTypes.func.isRequired,
  noUp: PropTypes.bool,
  tone: PropTypes.object.isRequired
};

export default Key;
