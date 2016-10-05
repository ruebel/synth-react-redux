import React, {PropTypes} from 'react';
import Effect from '../Effect';
import RangeControl from '../../../../RangeControl';
import {equalPower} from '../../../../../utils/audio';

export const defaultSettings = {
  effectLevel: 1,
  time: 0.2,
  feedback: 1
};

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
    if (!prev || next.settings.feedback !== prev.settings.feedback) {
      this.effect.forEach((repeat, i) => {
        // Apply equal power fading of delays based on feedback amount
        const level = Math.max(0, Math.min(1, (i - (next.settings.feedback || 0)) / this.effect.length + 0.8));
        repeat.gain.gain.value = equalPower(level, true);
      });
    }
    if (!prev || next.settings.time !== prev.settings.time) {
      this.effect.forEach((repeat, i) => {
        repeat.delay.delayTime.value = (next.settings.time || 0.2) * (i + 1);
      });
    }
    this.props.wire(next, prev, this.effect);
  }

  setupAudio() {
    // Create delay bank we will need a delay node and a gain node in each repeat
    // this will allow us to have falling gain as the delays get later
    this.effect = [];
    for(let i = 1; i < 6; i++) {
      let repeat = {
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
        <h3>Delay</h3>
        <RangeControl title="Time"
                      min={0.01}
                      max={2}
                      onSet={e => this.props.handleSettingsChange('time', e)}
                      value={this.props.settings.time || 0.2}
                      />
        <RangeControl title="Feedback"
                      min={0}
                      max={2}
                      onSet={e => this.props.handleSettingsChange('feedback', e)}
                      value={this.props.settings.feedback || 0}
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
