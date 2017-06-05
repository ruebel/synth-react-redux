import React, { PropTypes } from 'react';
import Row from './Row';

const NoteGrid = ({ addNote, beats, notes, position, removeNote }) => {
  return (
    <div style={{ overflowX: scroll }}>
      <table>
        <tbody>
          <tr>
            <th />
            {Object.keys(beats).map((k, i) =>
              <th key={i}>
                {i === 0 || beats[k].measure !== beats[i - 1].measure
                  ? beats[k].measure
                  : ''}
              </th>
            )}
          </tr>
          {Object.keys(notes).map((k, i) =>
            <Row
              addNote={addNote}
              beats={beats}
              key={i}
              position={position}
              removeNote={removeNote}
              tone={notes[k]}
            />
          )}
        </tbody>
      </table>
    </div>
  );
};

NoteGrid.propTypes = {
  addNote: PropTypes.func.isRequired,
  beats: PropTypes.object,
  notes: PropTypes.object,
  position: PropTypes.number,
  removeNote: PropTypes.func.isRequired
};

export default NoteGrid;
