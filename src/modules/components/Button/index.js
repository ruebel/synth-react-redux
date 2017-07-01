import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.button`
  background-color: ${p => p.theme.color.primary};
  color: ${p => p.theme.color.light};
  min-height: 42px;
  border: none;
  cursor: ${p => p.selected ? 'not-allowed' : 'pointer'};
  font-size: 1.2em;
  margin: 0;
  transition: background-color 100ms ease-in-out, transform 100ms ease-in-out;

  &:hover:enabled {
    transform: scaleX(1.1) scaleY(1.1);
    background-color: color(${p => p.theme.color.primary} b(15%));
  }

  &:disabled {
    background-color: ${p => p.theme.color.controlDisabled};
    cursor: not-allowed;
  }

  .empty {
    background-color: ${p => p.theme.color.controlEmpty};
    color: ${p => p.theme.color.light};

    &:hover:enabled {
      background-color: color(${p => p.theme.color.controlSuccess} b(15%));
    }
  }

  .primary {
    background-color: ${p => p.theme.color.primary};
    color: ${p => p.theme.color.light};

    &:hover:enabled {
      background-color: color(${p => p.theme.color.primary} b(15%));
    }
  }

  .success, :disabled.selected {
    background-color: ${p => p.theme.color.controlSuccess};
    color: ${p => p.theme.color.light};

    &:hover:enabled {
      background-color: color(${p => p.theme.color.controlSuccess} b(15%));
    }
  }

  .danger {
    background-color: ${p => p.theme.color.controlDanger};
    color: ${p => p.theme.color.light};

    &:hover:enabled {
      background-color: color(${p => p.theme.color.controlDanger} b(10%));
    }
  }
`;

const Button = ({active, click, color, selected, text}) => {
  return (
    <Wrapper
      disabled={!active || selected}
      onClick={() => click()}
      selected={selected}
      style={{background: color}}>
      <div>{text || 'Click Me!'}</div>
    </Wrapper>
  );
};

Button.propTypes = {
  active: PropTypes.bool,
  click: PropTypes.func.isRequired,
  color: PropTypes.string,
  flavor: PropTypes.string,
  selected: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export default Button;
