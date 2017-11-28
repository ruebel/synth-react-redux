import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Color from 'color';
import H3 from '../typography/H3';
import LinkButton from '../Button/LinkButton';
import PowerSwitch from '../PowerSwitch';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${p => (p.pullUp ? '-40' : '0')}px;

  & > button {
    margin-top: -10px;
    margin-right: -10px;
  }
`;

const Title = styled(H3)`
  margin: 0;
`;

const Wrapper = styled.div`
  margin: 10px 0;
  padding: ${p => (p.tight ? '5' : '10')}px;
  ${p => (p.tight ? '& > div > button { margin: 0; }' : '')};
  border: 2px ${p => p.theme.color.border} solid;
  background: ${p =>
    Color(p.theme.color.light)
      .alpha(p.active ? 0.5 : 0.1)
      .string()};
  width: ${p => (p.full ? '100' : '50')}%;
  transition: background 200ms ease-in;
`;

const Container = ({
  active,
  activeChange,
  close,
  children,
  full,
  tight,
  title,
  titleControl
}) => {
  return (
    <Wrapper active={active} full={full} tight={tight}>
      <Header pullUp={!title && (titleControl || close)}>
        <Title>{title}</Title>
        {titleControl}
        {activeChange && <PowerSwitch value={active} change={activeChange} />}
        {close && <LinkButton active click={close} text="X" />}
      </Header>
      {children}
    </Wrapper>
  );
};

Container.propTypes = {
  active: PropTypes.bool,
  activeChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.node
  ]),
  close: PropTypes.func,
  full: PropTypes.bool,
  tight: PropTypes.bool,
  title: PropTypes.string,
  titleControl: PropTypes.element
};

export default Container;
