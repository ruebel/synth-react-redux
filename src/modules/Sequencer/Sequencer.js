import React, {PropTypes} from 'react';
import NoteGrid from './components/NoteGrid';

class Sequencer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeNotes: [],
      beats: {},
      notes: {},
      position: 0,
    };

    this.next = this.next.bind(this);
    this.setBeats = this.setBeats.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentDidMount() {
    this.setBeats(this.props);
    this.start(this.props);
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

  next() {
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

  setBeats(props) {
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

  start(props) {
    this.stop();
    this.timer = setInterval(
      this.next,
      60000 / (props.tempo * props.timeSig.num),
    );
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <NoteGrid
        beats={this.state.beats}
        notes={this.state.notes}
        position={this.state.position}
      />
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

export default Sequencer;
