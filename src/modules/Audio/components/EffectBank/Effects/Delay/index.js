import React from 'react';
import PropTypes from 'prop-types';
import Effect from '../Effect';
import EffectRange from '../../EffectRange';
import {
  checkPropChange,
  defaultEffectSettings
} from '../../../../../../utils/effect';

export const defaultSettings = Object.assign({}, defaultEffectSettings, {
  color: '#3299cc',
  feedback: {
    min: 0,
    max: 0.9,
    name: 'Feedback',
    value: 0.5
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
      this.feedback.gain.value = next.settings.feedback.value;
    }
    if (checkPropChange(prev, next, 'time')) {
      this.delay.delayTime.value = next.settings.time.value || 0.2;
    }
    this.props.wire(next, prev, this.delay, this.output);
  }

  setupAudio() {
    this.delay = this.props.context.createDelay(2);
    this.feedback = this.props.context.createGain();
    this.output = this.props.context.createGain();
    this.delay.connect(this.feedback);
    this.delay.connect(this.output);
    this.feedback.connect(this.delay);
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
