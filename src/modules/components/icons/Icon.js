import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const getColor = (active, colors, disabled, fill) => {
  if (!active && !disabled) {
    return null;
  }
  const target = fill ? 'fill' : 'stroke';
  const color = disabled ? colors.controlDisabled : fill ? colors.warning : colors.control;
  return `
    & g {
      ${target}: ${color};
    }
  `;
};

const getTransform = (down, left, up) => {
  if (down || left || up) {
    const rotation = down ? '90' : (left ? '180' : '-90');
    return `
      & > svg {
        transform: rotate(${rotation}deg);
      }
    `;
  }
  return null;
};

const Wrapper = styled.div`
  cursor: ${p => p.disabled ? 'not-allowed' : 'pointer'};
  display: inline-block;
  margin: 0 2px;
  ${p => getTransform(p.down, p.left, p.up)}
  ${p => getColor(p.active, p.theme.color, p.disabled, p.fill)}

  &:hover {
    & g {
      ${p => !p.disabled && `${p.fill ? 'fill' : 'stroke'}: ${p.theme.color.controlDanger};`}
    }
  }
`;

const Icon = (WrappedComponent, isFill) => {
  const IconComponent = (props) => {
    const {active, click, disabled, down, left, up} = props;
    return (
      <Wrapper
        active={active}
        disabled={disabled}
        down={down}
        fill={isFill}
        left={left}
        onClick={click}
        up={up}
        >
        <WrappedComponent
          {...props}
        />
      </Wrapper>

    );
  };

  IconComponent.propTypes = {
    active: PropTypes.bool,
    click: PropTypes.func,
    disabled: PropTypes.bool,
    down: PropTypes.bool,
    left: PropTypes.bool,
    up: PropTypes.bool,
    width: PropTypes.string,
    height: PropTypes.string
  };

  return IconComponent;
};

export default Icon;
