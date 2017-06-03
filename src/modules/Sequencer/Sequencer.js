import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// import * as actions from './actions';
import * as selectors from './selectors';
import NoteGrid from './components/NoteGrid';
import PowerSwitch from '../components/PowerSwitch';

class Sequencer extends React.Component {
  state = {
    activeNotes: [],
    beats: {},
    notes: {},
    on: false,
    position: -1,
  }

  componentDidMount() {
    this.setBeats(this.props);
    // this.start(this.props);
  }

  componentWillUnmount() {
    this.stop();
  }

  componenetWillReceiveProps(next) {
    if (
      next.tempo !== this.props.tempo ||
      next.props.timeSig.num !== this.props.timeSig.num
    ) {
      this.start(next);
    }
    if (next.timeSig.num !== this.props.timeSig.num ||
      next.timeSig.den !== this.props.timeSig.den) {
      this.setBeats(next);
    }
  }

  next = () => {
    this.setState(state => {
      const nextPos = state.position ===
        this.props.timeSig.num * 16 / this.props.timeSig.den * this.props.measureCnt - 1
        ? 0
        : state.position + 1;
      return {
        activeNotes: this.state.beats[nextPos],
        position: nextPos,
      };
    });
  }

  setBeats = (props) => {
    this.setState(() => ({
        beats: Array.from(
          Array(props.timeSig.num * 16 / props.timeSig.den * props.measureCnt),
        ).reduce((total, x, i) => ({
            ...total,
            [i]: {
              measure: Math.floor(props.timeSig.den * i / (16 * props.timeSig.num)) + 1,
              beat: Math.floor(props.timeSig.den * i / 16) % props.timeSig.num + 1,
              division: (i % (16 / props.timeSig.den)) + 1,
              notes: props.notes.filter(n => n.beat === i),
            }
          }), {}),
        notes: props.notes.reduce((total, n) => ({
          ...total,
          [n.tone]: n.tone
        }), {})
      })
    );
  }

  start = (props) => {
    this.stop();
    this.timer = setInterval(
      this.next,
      60000 / (props.tempo * props.timeSig.num),
    );
    this.setState(() => ({on : true}));
  }

  stop = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.setState(() => ({on : false}));
  }

  togglePower = () => {
    this.state.on ? this.stop() : this.start(this.props);
  }

  render() {
    return (
      <div>
        <PowerSwitch
          change={this.togglePower}
          title="Sequencer"
          value={this.state.on} />
        <NoteGrid
          beats={this.state.beats}
          notes={this.state.notes}
          position={this.state.position}
        />
      </div>
    );
  }
}

Sequencer.propTypes = {
  measureCnt: PropTypes.number,
  notes: PropTypes.array,
  tempo: PropTypes.number,
  timeSig: PropTypes.shape({
    num: PropTypes.number.isRequired,
    den: PropTypes.number.isRequired
  })
};

const mapStateToProps = (state) => ({
  measureCnt: selectors.getMeasureCnt(state),
  notes: selectors.getNotes(state),
  tempo: selectors.getTempo(state),
  timeSig: selectors.getTimeSig(state),
});

export default connect(mapStateToProps)(Sequencer);
