import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Color from 'color';
const colors = [
  'rgb(117, 171, 220)',
  'rgb(250, 211, 148)',
  'rgb(53, 183, 128)'
];

const getColor = (beat, note, on, hover = false) => {
  const hasNote = note && note.velocity > 0;
  if (on) {
    return 'rebeccapurple';
  } else if (hover) {
    return Color(colors[beat - 1]).darken(hasNote ? 0.2 : 0).string();
  } else if (hasNote) {
    return Color(colors[beat - 1])
      .alpha(Math.min(1, note.velocity / 128 + 0.3))
      .string();
  } else {
    return Color(colors[beat - 1]).desaturate(0.85).lighten(0.2).string();
  }
};

const Wrapper = styled.td`
  background: ${p => getColor(p.beat, p.note, p.on)};
  color: ${p => (p.on ? 'white' : 'black')};
  cursor: pointer;
  min-width: 20px;
  width: 45px;
  text-align: center;
  transition: background, transform 50ms ease-in-out;
  span {
    display: none;
  }

  &:hover {
    background: ${p => getColor(p.beat, p.note, p.on, true)};
    transform: scaleX(1.2) scaleY(1.2);
    span {
      display: inline-block;
    }
  }
`;

const Cell = ({ addNote, beat, id, note, on, removeNote, tone }) => {
  const hasNote = note && note.velocity > 0;
  return (
    <Wrapper
      beat={beat}
      note={note}
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
