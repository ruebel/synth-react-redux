import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import PowerSwitch from '../../components/PowerSwitch';
import RangeControl from '../../components/RangeControl';
import Tone from './ToneBank/Tone';
import {getKeys} from '../selectors';
import {selectors as appSelectors} from '../../App';
import {selectors as synthSelectors} from '../../Synth';
const arpeggiatorModes = [{
  id: 'down',
  name: 'Down'
}, {
  id: 'up',
  name: 'Up'
}, {
  id: 'upDown',
  name: 'Up / Down'
}];

const getNextIndex = (current, previous, length, mode) => {
  switch(mode.id) {
    case 'down':
      if (current - 1 >= 0) {
        return current - 1;
      } else {
        return length - 1;
      }
    case 'up':
      if (current + 1 < length) {
        return current + 1;
      } else {
        return 0;
      }
    case 'upDown':
      if (previous < current) {
        if (current + 1 < length) {
          return current + 1;
        } else {
          return current - 1;
        }
      } else {
        if (current - 1 >= 0) {
          return current - 1;
        } else {
          return current + 1;
        }
      }
  }
};

class Arpeggiator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      interval: 400,
      mode: arpeggiatorModes[0],
      noteIndex: 0,
      on: false,
      previousIndex: 0,
      tones: []
    };

    // Setup modulation
    this.modulation = this.props.context.createOscillator();
    this.modulation.type = this.props.settings.modulation.shape;
    this.modulation.frequency.value = this.props.settings.modulation.speed;
    this.modulation.start(0);
    this.modulationGain = this.props.context.createGain();
    this.modulation.connect(this.modulationGain);

    this.applySettings = this.applySettings.bind(this);

    this.next = this.next.bind(this);
    this.setInterval = this.setInterval.bind(this);
    this.setMode = this.setMode.bind(this);
    this.setPower = this.setPower.bind(this);
  }

  componentDidMount() {
    if (this.state.on) {
      setTimeout(this.next, this.state.interval);
    }
  }

  applySettings(next, prev) {
    if (!prev ||
      next.settings.modulation.depth !== prev.settings.modulation.depth ||
      next.settings.modulation.on !== prev.settings.modulation.on
    ) {
      // Modulation depth
      this.modulationGain.gain.value = next.settings.modulation.on ? next.settings.modulation.depth : 0;
    }
    if (!prev || next.settings.modulation.speed !== prev.settings.modulation.speed) {
      // Modulation Speed
      this.modulation.frequency.value = next.settings.modulation.speed;
    }
    if (!prev || next.settings.modulation.shape !== prev.settings.modulation.shape) {
      // Modulation wave shape
      this.modulation.type = next.settings.modulation.shape;
    }
  }

  setInterval(value) {
    this.setState(() => ({
      interval: value
    }));
  }

  setMode(mode) {
    this.setState(() => ({
      mode
    }));
  }

  setPower() {
    this.setState((state) => {
      if (!state.on) {
        setTimeout(this.next, this.state.interval);
      }
      return {
        on: !state.on
      };
    });
  }

  next() {
    if (this.state.on) {
      this.setState((state) => {
        let tones = Object.keys(this.props.tones)
        .filter(t => this.props.tones[t].velocity > 0);
        const noteIndex = getNextIndex(state.noteIndex, state.previousIndex, tones.length, state.mode);
        tones = tones.map((t, i) => {
          return Object.assign(this.props.tones[t], {
            velocity: i === noteIndex ? this.props.tones[t].velocity : 0
          });
        });
        return {
          noteIndex,
          previousIndex: state.noteIndex,
          tones
        };
      });
      setTimeout(this.next, this.state.interval);
    }
  }

  render() {
    const tones = this.state.tones.map((t, i) => {
      return (
        <Tone
          key={i}
          tone={t}
          context={this.props.context}
          modulation={this.modulationGain}
          output={this.props.output}
          settings={this.props.settings}
        />);
      });
    return (
      <div>
        Arpeggiator
        <RangeControl
          min={100}
          max={1000}
          onSet={this.setInterval}
          value={this.state.interval}
          title="Interval"
        />
        <PowerSwitch change={this.setPower} value={this.state.on}/>
        <Select
          labelKey="name"
          onChange={e => this.setMode(e)}
          options={arpeggiatorModes}
          searchable={false}
          title="Mode"
          value={this.state.mode}
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
  output: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  tones: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    tones: getKeys(state),
    context: appSelectors.getContext(state),
    settings: synthSelectors.getSynth(state)
  };
};

export default connect(mapStateToProps)(Arpeggiator);
