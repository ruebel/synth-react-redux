import React from 'react';
import PropTypes from 'prop-types';
import { Handle as SliderHandle } from 'rc-slider';
import styled from 'styled-components';
import Color from 'color';
import { scaleNumber } from '../../utils/math';

export const RangeStyler = styled.div`
  margin: 20px 0;
  ${p =>
    p.assigned
      ? `background: ${Color(p.theme.color.primary)
          .alpha(0.2)
          .string()}`
      : 'transparent'};
  padding: 0 ${p => p.handleSize / 2}px;
  position: relative;

  .rc-slider {
    position: relative;
    height: 14px;
    padding: 5px 0;
    width: 100%;
    border-radius: 6px;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .rc-slider * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .rc-slider-handle {
    background: ${p => p.theme.color.grayExtraDark};
    border-radius: 50%;
    color: ${p => p.theme.color.light};
    cursor: pointer;
    cursor: -webkit-grab;
    cursor: grab;
    font-size: 0.9em;
    height: ${p => p.handleSize}px;
    line-height: ${p => p.handleSize}px;
    margin-left: -${p => p.handleSize / 2}px;
    margin-top: -${p => p.handleSize / 2}px;
    position: absolute;
    text-align: center;
    transition: transform 0.2s ease-in, background 0.2s ease-in;
    width: ${p => p.handleSize}px;

    &:hover,
    &:active {
      background: ${p => p.theme.color.primary};
      border-radius: 50%;
      transform: scaleX(1.2) scaleY(1.2);
      transition: transform 0.2s ease-in, background 0.2s ease-in;
    }
  }
  .rc-slider-track {
    width: 100%;
    height: 2px;
    border: 1px solid ${p => p.theme.color.primary};
    position: absolute;
    left: 0;
    border-radius: 2px;
  }
  .rc-slider-rail {
    position: absolute;
    width: 100%;
    background-color: ${props => props.theme.color.graySemidark};
    height: 2px;
    border-radius: 2px;
  }
`;

export const Handle = ({ dragging, value, ...props }) => {
  return (
    <SliderHandle value={value} dragging={dragging || undefined} {...props}>
      {scaleNumber(value)}
    </SliderHandle>
  );
};

Handle.propTypes = {
  dragging: PropTypes.bool,
  value: PropTypes.string
};
