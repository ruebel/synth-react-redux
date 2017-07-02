import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import ReactSlider from 'react-slider';
import styled from 'styled-components';
import Color from 'color';
import { actions as controlActions } from '../../Control';
import { scaleNumber } from '../../../utils/math';

const Assign = styled.h3`
  color: ${p => p.theme.color.primary};
  cursor: pointer;
  display: flex;
  flex-direction: row;

  &:hover {
    color: ${p => Color(p.theme.color.primary).darken(0.1).string()};
  }

  & > div {
    display: inline-block;
    flex: 1;
    text-align: right;
    font-size: 0.7em;
  }
`;

const Wrapper = styled.div`
  margin: 20px 0;
  ${p =>
    p.assigned
      ? `background: ${Color(p.theme.color.primary).alpha(0.2).string()};`
      : ''} position: relative;

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
    position: relative;
  }
`;

const RangeControl = ({
  assign,
  assignControl,
  max,
  min,
  onSet,
  step,
  title,
  value
}) => {
  return (
    <Wrapper assigned={assign && assign.channel} handleSize={30}>
      {assign
        ? <Assign
            data-tip
            data-for="midi"
            onClick={() => assignControl(assign)}
          >
            {title}
            {assign.channel &&
              <div>
                {assign.channel}:{assign.control}
              </div>}
            <ReactTooltip id="midi">
              {assign.channel
                ? <div>
                    <h3>Click to edit MIDI control</h3>
                    <h3>
                      Channel:
                      <span>{assign.channel}</span>
                    </h3>
                    <h3>
                      Control:
                      <span>{assign.control}</span>
                    </h3>
                  </div>
                : 'Click to assign MIDI control'}
            </ReactTooltip>
          </Assign>
        : <h3>
            {title}
          </h3>}
      <ReactSlider
        className="slider"
        handleClassName="handle"
        value={value}
        onChange={e => onSet(e)}
        min={min || 0}
        max={max || 1.5}
        pearling
        step={step || 0.01}
        withBars
      >
        <div>
          {scaleNumber(value)}
        </div>
      </ReactSlider>
    </Wrapper>
  );
};

RangeControl.propTypes = {
  assign: PropTypes.shape({
    id: PropTypes.string.isRequired,
    effect: PropTypes.string.isRequired,
    property: PropTypes.string.isRequired,
    propertyId: PropTypes.string.isRequired
  }),
  assignControl: PropTypes.func.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  onSet: PropTypes.func.isRequired,
  step: PropTypes.number,
  title: PropTypes.string,
  value: PropTypes.number.isRequired
};

export default connect(null, {
  assignControl: controlActions.assignControl
})(RangeControl);
