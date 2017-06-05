import React, { PropTypes } from 'react';
import Cell from './Cell';

const Row = ({ addNote, beats, position, removeNote, tone }) => {
  return (
    <tr>
      <td>{tone}</td>
      {Object.keys(beats).map((k, i) =>
        <Cell
          addNote={addNote}
          beat={beats[k].beat}
          key={i}
          note={beats[k].notes.find(n => n.tone === tone)}
          on={k == position}
          removeNote={removeNote}
          tone={tone}
        />
      )}
    </tr>
  );
};

Row.propTypes = {
  addNote: PropTypes.func.isRequired,
  beats: PropTypes.object,
  position: PropTypes.number,
  removeNote: PropTypes.func.isRequired,
  tone: PropTypes.number
};

export default Row;