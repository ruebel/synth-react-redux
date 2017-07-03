import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.td`
  background: ${p => getColor(p.beat, p.hasNote, p.on)};
  color: ${p => (p.on ? 'white' : 'black')};
  min-width: 20px;
  width: 45px;
`;

const colors = ['117, 171, 220', '250, 211, 148', '53, 183, 128'];
const getColor = (beat, hasNote, on) => {
  if (on) {
    return 'rebeccapurple';
  } else {
    return `rgba(${colors[beat - 1]}, ${hasNote ? '1' : '0.3'})`;
  }
};

const Cell = ({ addNote, beat, id, note, on, removeNote, tone }) => {
  const hasNote = note && note.velocity > 0;
  return (
    <Wrapper
      beat={beat}
      hasNote={hasNote}
      on={on}
      onClick={() => (note ? removeNote(note) : addNote({ beat: id, tone }))}
    >
      {hasNote &&
        <span>
          {note.tone}
        </span>}
    </Wrapper>
  );
};

Cell.propTypes = {
  addNote: PropTypes.func.isRequired,
  beat: PropTypes.number,
  id: PropTypes.number,
  note: PropTypes.object,
  on: PropTypes.bool,
  removeNote: PropTypes.func.isRequired,
  tone: PropTypes.number
};

export default Cell;
