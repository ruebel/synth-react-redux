import React, { PropTypes } from 'react';

const colors = ['#75ABDC', '#FAD394', '#35B780', '#F2F2F2'];

const getStyle = (beat, on) => ({
  backgroundColor: on ? 'rebeccapurple' : colors[beat - 1],
  color: on ? 'white' : 'black',
  minWidth: '20px',
  width: '45px'
});

const Cell = ({ addNote, beat, note, on, removeNote, tone }) => {
  return (
    <td
      onClick={() => note ? removeNote(note) : addNote({beat: beat - 1, tone})}
      style={getStyle(beat, on)}>
      {note && note.velocity > 0 && <span>{note.tone}</span>}
    </td>
  );
};

Cell.propTypes = {
  addNote: PropTypes.func.isRequired,
  beat: PropTypes.number,
  note: PropTypes.object,
  on: PropTypes.bool,
  removeNote: PropTypes.func.isRequired,
  tone: PropTypes.number
};

export default Cell;
