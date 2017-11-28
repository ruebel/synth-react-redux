import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import styled from 'styled-components';
import Color from 'color';
import H3 from '../typography/H3';
import { Handle, RangeStyler } from '../RangeStyler';
import { actions as controlActions } from '../../Control';

const Assign = styled(H3)`
  color: ${p => p.theme.color.primary};
  cursor: pointer;
  display: flex;
  flex-direction: row;

  &:hover {
    color: ${p =>
      Color(p.theme.color.primary)
        .darken(0.1)
        .string()};
  }

  & > div {
    display: inline-block;
    flex: 1;
    text-align: right;
    font-size: 0.7em;
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
    <RangeStyler assigned={assign && assign.channel} handleSize={30}>
      {assign ? (
        <Assign data-tip data-for="midi" onClick={() => assignControl(assign)}>
          {title}
          {assign.channel && (
            <div>
              {assign.channel}:{assign.control}
            </div>
          )}
          <ReactTooltip id="midi">
            {assign.channel ? (
              <div>
                <H3>Click to edit MIDI control</H3>
                <H3>
                  Channel:
                  <span>{assign.channel}</span>
                </H3>
                <H3>
                  Control:
                  <span>{assign.control}</span>
                </H3>
              </div>
            ) : (
              'Click to assign MIDI control'
            )}
          </ReactTooltip>
        </Assign>
      ) : (
        <H3>{title}</H3>
      )}
      <Slider
        className="slider"
        handle={Handle}
        value={value}
        onChange={e => onSet(e)}
        min={min || 0}
        max={max || 1.5}
        step={step || 0.01}
      />
    </RangeStyler>
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
