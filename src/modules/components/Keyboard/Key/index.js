import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Color from 'color';

const getBg = (ebony, isOn, colors) => {
  if (ebony) {
    return isOn
      ? Color(colors.controlSuccess)
        .darken(0.3)
        .string()
      : colors.black;
  }
  return isOn ? colors.controlSuccess : colors.light;
};

const KeyElement = styled.div`
  background: ${p => getBg(p.ebony, p.isOn, p.theme.color)};
  border: 1px solid ${p => p.theme.color.black};
  border-radius: 0 0 2px 2px;
  display: inline-block;
  height: ${p => (p.ebony ? '60' : '100')}%;
  margin-right: ${p => (p.ebony ? '-8' : '-1')}px;
  margin-left: ${p => (p.ebony ? '-8' : '0')}px;
  position: relative;
  vertical-align: top;
  width: ${p => (p.ebony ? '16' : '20')}px;
  ${p => (p.ebony ? 'z-index: 2;' : '')};
`;

class Key extends React.PureComponent {
  handleUp = () => {
    if (!this.props.noUp) {
      this.toggleKey();
    }
  };

  toggleKey = () => {
    if (this.props.tone.velocity > 0) {
      this.props.keyUp(this.props.tone.id);
    } else {
      this.props.keyDown(this.props.tone.id);
    }
  };

  render() {
    const { tone } = this.props;
    return (
      <KeyElement
        ebony={(tone.note || '').length > 1}
        isOn={tone.velocity > 0}
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
