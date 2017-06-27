import React, { PropTypes } from 'react';

const colors = ['117, 171, 220', '250, 211, 148', '53, 183, 128'];
const getColor = (beat, hasNote, on) => {
  if (on) {
    return 'rebeccapurple';
  } else {
    return `rgba(${colors[beat - 1]}, ${hasNote ? '1' : '0.3'})`;
  }
};

const getStyle = (beat, hasNote, on) => ({
  backgroundColor: getColor(beat, hasNote, on),
  color: on ? 'white' : 'black',
  minWidth: '20px',
  width: '45px'
});

const Cell = ({ addNote, beat, id, note, on, removeNote, tone }) => {
  const hasNote = note && note.velocity > 0;
  return (
    <td
      onClick={() => (note ? removeNote(note) : addNote({ beat: id, tone }))}
      style={getStyle(beat, hasNote, on)}
    >
      {hasNote && <span>{note.tone}</span>}
    </td>
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
