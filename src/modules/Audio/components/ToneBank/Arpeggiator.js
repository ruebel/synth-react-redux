import React from 'react';
import PropTypes from 'prop-types';
import Indicator from './Indicator';
import RangeControl from '../../../components/RangeControl';
import Select from '../../../components/Select';
import Tone from '../ToneBank/Tone';
import {
  arpeggiatorModes,
  arpeggiatorOctaves,
  getNextIndex
} from '../../../../utils/audio';

class Arpeggiator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      indicator: false,
      noteIndex: 0,
      previousIndex: 0,
      tones: []
    };

    this.next = this.next.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(
      this.next,
      this.props.settings.arpeggiator.interval
    );
  }

  componentWillReceiveProps(next) {
    this.setState(state => {
      const octave = next.settings.arpeggiator.octave;
      return {
        tones: Object.keys(next.tones)
          .filter(
            (t, i, origin) =>
              next.tones[t].velocity > 0 ||
              (i > 11 &&
                octave > 1 &&
                next.tones[origin[i - 12]].velocity > 0) ||
              (i > 23 && octave > 2 && next.tones[origin[i - 24]].velocity > 0)
          )
          .map((t, i) => ({
            ...next.tones[t],
            originalVelocity: next.tones[t].velocity || 64,
            velocity: i === state.noteIndex ? next.tones[t].velocity : 0
          }))
      };
    });
    if (
      this.props.settings.arpeggiator.interval !==
      next.settings.arpeggiator.interval
    ) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(this.next, next.settings.arpeggiator.interval);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  next() {
    if (this.state.tones.length > 0) {
      this.setState(state => {
        const noteIndex = getNextIndex(
          state.noteIndex,
          state.previousIndex,
          state.tones.length,
          this.props.settings.arpeggiator.mode
        );
        return {
          noteIndex: noteIndex || 0,
          previousIndex: state.noteIndex || 0,
          tones: state.tones.map((t, i) => ({
            ...t,
            velocity: i === noteIndex ? t.originalVelocity : 0
          }))
        };
      });
    }
    this.setState(state => ({ indicator: !state.indicator }));
  }

  render() {
    const tones = this.state.tones.map((t, i) =>
      <Tone
        key={i}
        tone={t}
        context={this.props.context}
        modulation={this.props.modulationGain}
        output={this.props.output}
        settings={this.props.settings}
      />
    );
    return (
      <div>
        <Indicator on={this.state.indicator} />
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
          title="Direction"
          value={this.props.settings.arpeggiator.mode}
          valueKey="id"
        />
        <Select
          labelKey="name"
          onChange={this.props.setArpeggiatorOctave}
          options={arpeggiatorOctaves}
          searchable={false}
          title="Octave"
          value={this.props.settings.arpeggiator.octave}
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
  setArpeggiatorOctave: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  tones: PropTypes.object.isRequired
};

export default Arpeggiator;
