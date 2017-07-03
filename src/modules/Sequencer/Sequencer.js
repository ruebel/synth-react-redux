import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actions from './actions';
import * as selectors from './selectors';
import NoteGrid from './components/NoteGrid';
import PowerSwitch from '../components/PowerSwitch';
import Refresh from '../components/icons/Refresh';

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

class Sequencer extends React.Component {
  state = {
    beats: {},
    notes: {},
    on: false,
    position: -1
  };

  componentDidMount() {
    this.setBeats(this.props);
  }

  componentWillReceiveProps(next) {
    if (
      this.state.on &&
      (next.tempo !== this.props.tempo ||
        next.timeSig.num !== this.props.timeSig.num)
    ) {
      this.start(next);
    }
    if (
      next.timeSig.num !== this.props.timeSig.num ||
      next.timeSig.den !== this.props.timeSig.den ||
      next.measureCnt !== this.props.measureCnt ||
      next.notes.length !== this.props.notes.length
    ) {
      this.setBeats(next);
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  next = () => {
    this.setState(state => {
      // Calculate next position
      const nextPos =
        state.position ===
        this.props.timeSig.num *
          16 /
          this.props.timeSig.den *
          this.props.measureCnt -
          1
          ? 0
          : state.position + 1;
      // Trigger any note events in the next position
      this.props.triggerNotes(this.state.beats[nextPos].notes);
      // Set the state
      return {
        position: nextPos
      };
    });
  };

  reset = () => this.setState(() => ({ position: -1 }));

  setBeats = ({ measureCnt, notes, timeSig }) => {
    this.setState(() => ({
      beats: Array.from(
        Array(timeSig.num * 16 / timeSig.den * measureCnt)
      ).reduce(
        (total, x, i) => ({
          ...total,
          [i]: {
            id: i,
            measure: Math.floor(timeSig.den * i / (16 * timeSig.num)) + 1,
            beat: Math.floor(timeSig.den * i / 16) % timeSig.num + 1,
            division: i % (16 / timeSig.den) + 1,
            notes: notes.filter(n => n.beat === i)
          }
        }),
        {}
      ),
      notes: notes.reduce(
        (total, n) => ({
          ...total,
          [n.tone]: n.tone
        }),
        {}
      )
    }));
  };

  start = ({ tempo, timeSig }) => {
    this.stop();
    this.timer = setInterval(this.next, 60000 / (tempo * timeSig.num));
    this.setState(() => ({ on: true }));
  };

  stop = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.props.stop();
    this.setState(() => ({ on: false }));
  };

  togglePower = () => {
    this.state.on ? this.stop() : this.start(this.props);
  };

  render() {
    return (
      <div>
        <ActionWrapper>
          <PowerSwitch
            change={this.togglePower}
            title="Sequencer"
            value={this.state.on}
          />
          <Refresh click={this.reset} />
        </ActionWrapper>
        <NoteGrid
          addNote={this.props.addNote}
          beats={this.state.beats}
          notes={this.state.notes}
          position={this.state.position}
          removeNote={this.props.removeNote}
        />
      </div>
    );
  }
}

Sequencer.propTypes = {
  addNote: PropTypes.func.isRequired,
  measureCnt: PropTypes.number,
  notes: PropTypes.array,
  removeNote: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  tempo: PropTypes.number,
  timeSig: PropTypes.shape({
    num: PropTypes.number.isRequired,
    den: PropTypes.number.isRequired
  }),
  triggerNotes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  measureCnt: selectors.getMeasureCnt(state),
  notes: selectors.getNotes(state),
  tempo: selectors.getTempo(state),
  timeSig: selectors.getTimeSig(state)
});

export default connect(mapStateToProps, {
  addNote: actions.addNote,
  removeNote: actions.removeNote,
  stop: actions.stop,
  triggerNotes: actions.triggerNotes
})(Sequencer);
