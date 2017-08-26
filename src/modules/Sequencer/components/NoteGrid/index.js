import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Row from './Row';

const Wrapper = styled.div`overflow-x: scroll;`;

const NoteGrid = ({
  addNote,
  beats,
  notes,
  position,
  removeNote,
  selectNote
}) => {
  return (
    <Wrapper>
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
              selectNote={selectNote}
              tone={notes[k]}
            />
          )}
        </tbody>
      </table>
      <Button active click={() => 1} small text="+" />
    </Wrapper>
  );
};

NoteGrid.propTypes = {
  addNote: PropTypes.func.isRequired,
  beats: PropTypes.object,
  notes: PropTypes.object,
  position: PropTypes.number,
  removeNote: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired
};

export default NoteGrid;
