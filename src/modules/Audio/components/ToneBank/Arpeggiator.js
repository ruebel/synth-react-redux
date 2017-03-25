import React, {PropTypes} from 'react';
import Select from 'react-select';
import RangeControl from '../../../components/RangeControl';
import Tone from '../ToneBank/Tone';
import {arpeggiatorModes, getNextIndex} from '../../../../utils/audio';

class Arpeggiator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      noteIndex: 0,
      previousIndex: 0,
      tones: []
    };

    this.next = this.next.bind(this);
  }

  componentDidMount() {
    setTimeout(this.next, this.props.settings.arpeggiator.interval);
  }

  componentWillReceiveProps(next) {
    this.setState(state => {
      return {
        tones: Object.keys(next.tones)
          .filter(t => next.tones[t].velocity > 0)
          .map((t, i) => Object.assign({}, next.tones[t], {
            originalVelocity: next.tones[t].velocity,
            velocity: i === state.noteIndex ? next.tones[t].velocity : 0
          }))
      };
    });
  }

  next() {
    if (this.state.tones.length > 0) {
      this.setState((state) => {
        const noteIndex = getNextIndex(state.noteIndex, state.previousIndex, state.tones.length, this.props.settings.arpeggiator.mode);
        return {
          noteIndex: noteIndex || 0,
          previousIndex: state.noteIndex || 0,
          tones: state.tones.map((t, i) => {
            return Object.assign({}, t, {
              velocity: i === noteIndex ? t.originalVelocity : 0
            });
          })
        };
      });
    }
    setTimeout(this.next, this.props.settings.arpeggiator.interval);
  }

  render() {
    const tones = this.state.tones.map((t, i) => {
      return (
        <Tone
          key={i}
          tone={t}
          context={this.props.context}
          modulation={this.props.modulationGain}
          output={this.props.output}
          settings={this.props.settings}
        />);
      });
    return (
      <div>
        <RangeControl
          min={30}
          max={1000}
          onSet={this.props.setArpeggiatorInterval}
          value={this.props.settings.arpeggiator.interval}
          title="Interval"
        />
        <Select
          labelKey="name"
          onChange={this.props.setArpeggiatorMode}
          options={arpeggiatorModes}
          searchable={false}
          title="Mode"
          value={this.props.settings.arpeggiator.mode}
          valueKey="id"
        />
        <div>
          {tones}
        </div>
      </div>
    );
  }
}

Arpeggiator.propTypes = {
  context: PropTypes.object.isRequired,
  modulationGain: PropTypes.object.isRequired,
  output: PropTypes.object.isRequired,
  setArpeggiatorInterval: PropTypes.func.isRequired,
  setArpeggiatorMode: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  tones: PropTypes.object.isRequired
};

export default Arpeggiator;
