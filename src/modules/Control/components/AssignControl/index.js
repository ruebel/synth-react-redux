import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/Button';
import RangeControl from '../../../components/RangeControl';
import Modal from '../../../components/Modal';
import { addControl, assignControl, removeControl } from '../../actions';
import { getAssign, getLast } from '../../selectors';
const styles = require('./styles.css');

const AssignControl = ({
  addControl,
  assignControl,
  control,
  note,
  removeControl
}) => {
  return control
    ? <Modal close={assignControl}>
        <div className={styles.wrapper}>
          <h1>Assign MIDI Control</h1>
          <h3 className={styles.control}>
            {control.effect} - {control.property}
          </h3>
          <div className={styles.midi}>
            {!note && !control.channel && <h3>Activate MIDI Control</h3>}
            {(note || control.channel) &&
              <div>
                <h3>
                  Channel:
                  <span>
                    {note ? note[0] : control.channel}
                  </span>
                </h3>
                <h3>
                  Control:
                  <span>
                    {note ? note[1] : control.control}
                  </span>
                </h3>
                <RangeControl
                  title="Value"
                  value={note ? note[2] : 0}
                  min={0}
                  max={127}
                  onSet={() => 1}
                />
              </div>}
          </div>
          <div className={styles.buttonRow}>
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
          </div>
        </div>
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
