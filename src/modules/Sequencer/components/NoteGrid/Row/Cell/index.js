import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Color from 'color';
const colors = ['#73aade', '#fbd490', '#2cb87e', '#de73aa'];
const onColor = '#672e9b';

const getColor = (beat, note, on, hover = false) => {
  const hasNote = note && note.velocity > 0;
  if (on) {
    return hasNote ? onColor : Color(onColor).lighten(0.75).string();
  } else if (hasNote && note.selected) {
    return Color(onColor)
      .alpha(Math.min(1, note.velocity / 128 + 0.3))
      .lighten(0.5)
      .string();
  } else if (hover) {
    return Color(colors[beat - 1]).darken(hasNote ? 0.2 : 0).string();
  } else if (hasNote) {
    return Color(colors[beat - 1])
      .alpha(Math.min(1, note.velocity / 128 + 0.3))
      .string();
  } else {
    return Color(colors[beat - 1]).desaturate(0.85).lighten(0.25).string();
  }
};

const Wrapper = styled.td`
  background: ${p => getColor(p.beat, p.note, p.on)};
  border: ${p =>
    p.note && p.note.selected
      ? `2px solid ${Color(onColor).lighten(0.8).string()}`
      : 'none'};
  box-shadow: ${p => (p.note && p.note.selected ? `0 0 2px 1px #eee` : 'none')};
  color: ${p => (p.on ? p.theme.color.light : p.theme.color.black)};
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
    border: none;
    transform: scaleX(1.2) scaleY(1.2);
    span {
      display: inline-block;
    }
  }
`;

class Cell extends React.PureComponent {
  handleClick = () => {
    const { addNote, id, note, removeNote, selectNote, tone } = this.props;
    if (note) {
      if (note.selected) {
        removeNote(note.id);
      } else {
        selectNote(note.id);
      }
    } else {
      addNote({ beat: id, tone });
    }
  };

  render() {
    const { beat, note, on } = this.props;
    const hasNote = note && note.velocity > 0;
    return (
      <Wrapper beat={beat} note={note} on={on} onClick={this.handleClick}>
        <span>
          {hasNote ? (note.selected ? '-' : '') : '+'}
        </span>
      </Wrapper>
    );
  }
}

Cell.propTypes = {
  addNote: PropTypes.func.isRequired,
  beat: PropTypes.number,
  id: PropTypes.number,
  note: PropTypes.object,
  on: PropTypes.bool,
  removeNote: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired,
  tone: PropTypes.number
};

export default Cell;
