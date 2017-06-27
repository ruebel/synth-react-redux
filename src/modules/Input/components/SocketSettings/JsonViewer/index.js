import React, {PropTypes} from 'react';
import styled from 'styled-components';

const Data = styled.div`
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  overflow: scroll;
  background-color: #222222;
  color: #59AFD9;
  position: relative;
  border-radius: 3px;
  padding-left: 5px;
`;

const JsonViewer = ({children, data, minimized}) => {
  return (
    <Data>
      {children}
      <pre>
        {data && !minimized ? JSON.stringify(data, null, 2) : '{...}'}
      </pre>
    </Data>
  );
};

JsonViewer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element
  ]),
  data: PropTypes.object,
  minimized: PropTypes.bool
};

export default JsonViewer;
