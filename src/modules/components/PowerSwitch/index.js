import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const size = 28;
const borderSize = '2px';
const transTime = '200ms';

const Inner = styled.div`
  background: ${p => (p.on ? p.theme.color.light : 'transparent')};
  border: ${borderSize} ${p => p.theme.color.border} solid;
  border-radius: ${size}px;
  width: ${2 * size}px;
  min-width: ${2 * size}px;
  height: ${size}px;
  transition: background ${transTime} ease-in;
  display: inline-block;
  cursor: pointer;

  & > div {
    border-radius: 50%;
    border: ${borderSize} ${p => p.theme.color.border} solid;
    background: ${p => p.theme.color.light};
    width: ${size}px;
    height: ${size}px;
    margin-top: -${borderSize};
    margin-left: -${borderSize};
    ${p => (p.on ? `transform: translateX(${size}px);` : '')};
    transition: background ${transTime} ease-in-out,
      transform ${transTime} ease-in-out;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  & > h3 {
    margin-right: 30px;
    color: ${p =>
      p.on ? p.theme.color.grayExtraDark : p.theme.color.graySemidark};
    transition: color ${transTime} ease-in;
  }
`;

const PowerSwitch = ({ change, title, value }) => {
  return (
    <Wrapper on={value}>
      {title &&
        <h3>
          {title}
        </h3>}
      <Inner on={value} onClick={() => change()}>
        <div />
      </Inner>
    </Wrapper>
  );
};

PowerSwitch.propTypes = {
  change: PropTypes.func.isRequired,
  title: PropTypes.string,
  value: PropTypes.bool
};

export default PowerSwitch;
