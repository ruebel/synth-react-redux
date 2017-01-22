import React, {PropTypes} from 'react';
import Effect from '../Effect';
import EffectRange from '../../EffectRange';
import {equalPower} from '../../../../../utils/audio';
import {checkPropChange, defaultEffectSettings} from '../../../../../utils/effect';

export const defaultSettings = Object.assign({}, defaultEffectSettings, {
  color: '#3299cc',
  feedback: {
    min: 0,
    max: 2,
    name: 'Feedback',
    value: 1
  },
  name: 'Delay',
  time: {
    min: 0.01,
    max: 2,
    name: 'Time',
    value: 0.2
  },
  title: 'Delay'
});

class Delay extends React.Component {
  constructor(props) {
    super(props);

    this.applySettings = this.applySettings.bind(this);
    this.setupAudio = this.setupAudio.bind(this);
  }

  componentDidMount() {
    this.setupAudio();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props) {
      this.applySettings(nextProps, this.props);
    }
  }

  applySettings(next, prev) {
    if (checkPropChange(prev, next, 'feedback')) {
      this.effect.forEach((repeat, i) => {
        // Apply equal power fading of delays based on feedback amount
        const level = Math.max(0, Math.min(1, (i - (next.settings.feedback.value || 0)) / this.effect.length + 0.8));
        repeat.gain.gain.value = equalPower(level, true);
      });
    }
    if (checkPropChange(prev, next, 'time')) {
      this.effect.forEach((repeat, i) => {
        repeat.delay.delayTime.value = (next.settings.time.value || 0.2) * (i + 1);
      });
    }
    this.props.wire(next, prev, this.effect);
  }

  setupAudio() {
    // Create delay bank we will need a delay node and a gain node in each repeat
    // this will allow us to have falling gain as the delays get later
    this.effect = [];
    for(let i = 1; i < 6; i++) {
      const repeat = {
        input: this.props.context.createDelay(2 * i),
        output: this.props.context.createGain()
      };
      // Aliasing so I stop referencing these incorrectly
      repeat.delay = repeat.input;
      repeat.gain = repeat.output;
      // Connect the delay and gain together
      repeat.input.connect(repeat.output);
      this.effect.push(repeat);
    }
    this.applySettings(this.props);
  }

  render() {
    return (
      <div>
        <EffectRange
          change={this.props.handleSettingsChange}
          defaults={defaultSettings}
          property="time"
          settings={this.props.settings}
        />
        <EffectRange
          change={this.props.handleSettingsChange}
          defaults={defaultSettings}
          property="feedback"
          settings={this.props.settings}
        />
      </div>
    );
  }
}

Delay.propTypes = {
  context: PropTypes.object.isRequired,
  handleSettingsChange: PropTypes.func.isRequired,
  input: PropTypes.object,
  settings: PropTypes.object.isRequired,
  output: PropTypes.object.isRequired,
  wire: PropTypes.func.isRequired
};


export default Effect(Delay, 'wet');
