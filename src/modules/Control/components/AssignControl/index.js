import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Button from '../../../components/Button';
import H1 from '../../../components/typography/H1';
import H3 from '../../../components/typography/H3';
import RangeControl from '../../../components/RangeControl';
import Modal from '../../../components/Modal';
import { addControl, assignControl, removeControl } from '../../actions';
import { getAssign, getLast } from '../../selectors';

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: center;
  margin-top: 50px;

  & > button {
    flex: 1;
    margin-right: 5px;
  }
`;

const Control = styled(H3)`
  & span {
    color: ${p => p.theme.color.primary};
    margin-left: 10px;
  }
`;

const Header = styled(H3)`
  font-size: 1.5em;
  color: ${p => p.theme.color.secondary};
`;

const Midi = styled.div`
  border: 2px solid ${p => p.theme.color.border};
  height: 190px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  & > div {
    align-self: stretch;
  }
`;

const Title = styled(H1)`
  margin-top: 0;
`;

const Wrapper = styled.div`
  text-align: center;
`;

const AssignControl = ({
  addControl,
  assignControl,
  control,
  note,
  removeControl
}) => {
  return control
    ? <Modal close={assignControl}>
        <Wrapper>
          <Title>Assign MIDI Control</Title>
          <Header>
            {control.effect} - {control.property}
          </Header>
          <Midi>
            {!note && !control.channel && <Control>Activate MIDI Control</Control>}
            {(note || control.channel) &&
              <div>
                <Control>
                  Channel:
                  <span>{note ? note[0] : control.channel}</span>
                </Control>
                <Control>
                  Control:
                  <span>{note ? note[1] : control.control}</span>
                </Control>
                <RangeControl
                  title="Value"
                  value={note ? note[2] : 0}
                  min={0}
                  max={127}
                  onSet={() => 1}
                />
              </div>}
          </Midi>
          <ButtonRow>
            <Button
              active
              click={() => assignControl()}
              text="Cancel"
              type="link"
            />
            <Button
              active={Boolean(control.channel)}
              click={() => removeControl(control)}
              text="Remove"
              type="danger"
            />
            <Button
              active={Boolean(note)}
              click={() => addControl(control, note)}
              text="Assign"
            />
          </ButtonRow>
        </Wrapper>
      </Modal>
    : null;
};

AssignControl.propTypes = {
  addControl: PropTypes.func.isRequired,
  assignControl: PropTypes.func.isRequired,
  control: PropTypes.shape({
    id: PropTypes.string.isRequired,
    effect: PropTypes.string.isRequired,
    property: PropTypes.string.isRequired
  }),
  note: PropTypes.object,
  removeControl: PropTypes.func.isRequired,
  show: PropTypes.bool
};

const mapStateToProps = state => ({
  control: getAssign(state),
  note: getLast(state)
});

export default connect(mapStateToProps, {
  addControl,
  assignControl,
  removeControl
})(AssignControl);
