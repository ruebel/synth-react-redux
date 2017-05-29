import React, {PropTypes} from 'react';
import Row from './Row';

const NoteGrid = ({beats, notes, position}) => {
  return (
    <div style={{overflowX: scroll}}>
      Note Grid
      <table>
        <tbody>
          <tr>
            <th/>
            {Object.keys(beats).map((k, i) => (
              <th key={i}>
                {i === 0 || beats[k].measure !== beats[i - 1].measure ? beats[k].measure : ''}
              </th>
            ))}
          </tr>
          {Object.keys(notes).map((k, i) => (
            <Row
              beats={beats}
              key={i}
              note={notes[k]}
              position={position}
              />
          ))}
        </tbody>
      </table>
    </div>
  );
};

NoteGrid.propTypes = {
  beats: PropTypes.object,
  notes: PropTypes.object,
  position: PropTypes.number
};

export default NoteGrid;
