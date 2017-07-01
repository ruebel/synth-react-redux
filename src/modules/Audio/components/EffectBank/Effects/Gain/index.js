import React from 'react';
import PropTypes from 'prop-types';
import RangeControl from '../../../../../components/RangeControl';

class Gain extends React.Component {
  constructor(props) {
    super(props);

    this.applySettings = this.applySettings.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.gain = this.props.context.createGain();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props) {
      this.applySettings(nextProps, this.props);
    }
  }

  applySettings(next, prev) {
    if (!prev || prev.value !== next.value) {
      this.gain.value = next.value;
    }
    if (!prev || prev.input !== next.input) {
      next.input.disconnect();
      next.input.connect(this.gain);
    }
    if (!prev || prev.output !== next.output) {
      this.gain.disconnect();
      this.gain.connect(next.output);
    }
  }

  handleLevelChange(value) {
    this.props.change(value);
  }

  render() {
    return (
      <div>
        <RangeControl title={this.props.title || 'Volume'}
                      min={0}
                      max={1}
                      onSet={e => this.handleLevelChange(e)}
                      value={this.props.value || 1}
          />
      </div>
    );
  }
}

Gain.propTypes = {
  change: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  output: PropTypes.object.isRequired,
  title: PropTypes.string,
  value: PropTypes.number.isRequired
};

export default Gain;
