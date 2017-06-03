import React, { PropTypes } from 'react';
const styles = require('./styles.css');

const JsonViewer = ({ children, data, minimized }) => {
  return (
    <div className={styles.data}>
      {children}
      <pre>
        {data && !minimized ? JSON.stringify(data, null, 2) : '{...}'}
      </pre>
    </div>
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
