import React, {PropTypes} from 'react';

const colors = [
  '#75ABDC',
  '#FAD394',
  '#35B780',
  '#F2F2F2'
];

const getStyle = (beat, on) => ({
  backgroundColor: on ? 'rebeccapurple' : colors[beat - 1],
  color: on ? 'white' : 'black',
  minWidth: '20px',
  width: '45px'
});


const Cell = ({beat, note, on}) => {
  return (
    <td style={getStyle(beat, on)}>
      {note && <span>{note.tone}</span>}
    </td>
  );
};

Cell.propTypes = {
  beat: PropTypes.objecct,
  note: PropTypes.object,
  on: PropTypes.bool
};

export default Cell;
