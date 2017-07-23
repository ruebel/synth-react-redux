import React from 'react';
import PropTypes from 'prop-types';
import ReactSlider from 'react-slider';
import styled from 'styled-components';
import H3 from '../typography/H3';
import { scaleNumber } from '../../../utils/math';

const Wrapper = styled.div`
  margin: 20px 0;

  .handle {
    font-size: 0.9em;
    line-height: ${p => p.handleSize}px;
    text-align: center;
    background: ${p => p.theme.color.grayExtraDark};
    color: ${p => p.theme.color.light};
    cursor: pointer;
    width: ${p => p.handleSize}px;
    border-radius: 50%;
    height: ${p => p.handleSize}px;
    margin-top: -${p => p.handleSize / 2}px;
    z-index: 0;
    transition: transform 0.2s ease-in, background 0.2s ease-in;

    &:hover,
    &:active {
      background: ${p => p.theme.color.primary};
      border-radius: 50%;
      transform: scaleX(1.2) scaleY(1.2);
      transition: transform 0.2s ease-in, background 0.2s ease-in;
    }
  }

  .slider {
    width: 100%;
    height: 2px;
    border: 1px solid ${p => p.theme.color.graySemidark};
    margin-bottom: 15px;
  }
`;

const MinMax = ({ max = 1.5, min = 0, onSet, step = 0.01, title, value }) => {
  return (
    <Wrapper handleSize={30}>
      <H3>
        {title}
      </H3>
      <ReactSlider
        className="slider"
        handleClassName="handle"
        value={value}
        onChange={e => onSet(e)}
        min={min}
        max={max}
        pearling
        step={step}
        withBars
      >
        <div>
          {scaleNumber(value[0])}
        </div>
        <div>
          {scaleNumber(value[1])}
        </div>
      </ReactSlider>
    </Wrapper>
  );
};

MinMax.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  onSet: PropTypes.func.isRequired,
  step: PropTypes.number,
  title: PropTypes.string,
  value: PropTypes.array.isRequired
};

export default MinMax;
