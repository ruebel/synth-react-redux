import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';
import PowerSwitch from '../PowerSwitch';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  ${p => p.pullUp && 'margin-bottom: -40px;'} & > h3 {
    margin: 0;
  }

  & > button {
    margin-top: -10px;
    margin-right: -10px;
  }
`;

const Wrapper = styled.div`
  margin: 10px 0;
  ${p =>
    p.tight
      ? `
    padding: 5px;

    & > div > button {
      margin: 0;
    }
  `
      : 'padding: 10px;'} border: 2px ${p => p.theme.color.border} solid;
  background: ${p => (p.active ? p.theme.light : p.theme.color.grayExtraLight)};
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
        <h3>
          {title}
        </h3>
        {titleControl}
        {activeChange && <PowerSwitch value={active} change={activeChange} />}
        {close && <Button active click={close} text="X" type="link" />}
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
    PropTypes.arrayOf(PropTypes.element)
  ]),
  close: PropTypes.func,
  full: PropTypes.bool,
  tight: PropTypes.bool,
  title: PropTypes.string,
  titleControl: PropTypes.element
};

export default Container;
