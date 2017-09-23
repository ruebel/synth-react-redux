import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import Header from './Header';

const Row = ({ addNote, beats, position, removeNote, selectNote, tone }) => {
  return (
    <tr>
      <Header tone={tone} />
      {Object.keys(beats).map((k, i) =>
        <Cell
          addNote={addNote}
          beat={beats[k].beat}
          id={beats[k].id}
          key={i}
          note={beats[k].notes.find(n => n.tone === tone && n.velocity > 0)}
          // eslint-disable-next-line eqeqeq
          on={k == position}
          removeNote={removeNote}
          selectNote={selectNote}
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
  selectNote: PropTypes.func.isRequired,
  tone: PropTypes.number
};

export default Row;
