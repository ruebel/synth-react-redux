import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import RangeControl from '../../../components/RangeControl';
import Select from '../../../components/Select';

const noteLengths = [
  { id: 1, name: 'Whole' },
  { id: 0.5, name: 'Half' },
  { id: 0.25, name: 'Quarter' },
  { id: 0.125, name: 'Eight' },
  { id: 0.0625, name: 'Sixteenth' }
];

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & * {
    flex: 0.4;
  }
`;

class NoteSettings extends React.PureComponent {
  updateLength = length => {
    this.props.update({
      ...this.props.note,
      length: length.id
    });
  };

  updateVelocity = velocity => {
    this.props.update({
      ...this.props.note,
      velocity
    });
  };

  render() {
    const { note } = this.props;
    return (
      <Wrapper>
        <RangeControl
          title="Velocity"
          value={note.velocity}
          onSet={this.updateVelocity}
          min={1}
          max={127}
        />
        <Select
          labelKey="name"
          onChange={this.updateLength}
          options={noteLengths}
          title="Length"
          value={note.length}
          valueKey="id"
        />
      </Wrapper>
    );
  }
}

NoteSettings.propTypes = {
  note: PropTypes.shape({
    length: PropTypes.number,
    velocity: PropTypes.number
  }),
  update: PropTypes.func.isRequired
};

export default NoteSettings;
