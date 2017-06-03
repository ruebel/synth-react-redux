import React, { PropTypes } from 'react';
import Cell from './Cell';

const Row = ({ beats, note, position }) => {
  return (
    <tr>
      <td>{note}</td>
      {Object.keys(beats).map((k, i) =>
        <Cell
          beat={beats[k].beat}
          key={i}
          note={beats[k].notes.find(n => n.tone === note)}
          on={k == position}
        />
      )}
    </tr>
  );
};

Row.propTypes = {
  beats: PropTypes.object,
  note: PropTypes.number,
  position: PropTypes.number
};

export default Row;
