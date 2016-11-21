import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Container from '../../Container';
import RangeControl from '../../RangeControl';
import {setOutputLevel} from '../../../actions/audio';

class OutputGain extends React.Component {
  constructor(props) {
    super(props);

    this.applySettings = this.applySettings.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props) {
      this.applySettings(nextProps, this.props);
    }
  }

  applySettings(next, prev) {
    if (!prev || prev.level !== next.level) {
      this.props.gain.gain.value = next.level;
    }
  }

  handleLevelChange(value) {
    this.props.setOutputLevel(value);
  }

  render() {
    return (
      <Container active title="Volume">
        <RangeControl
                      min={0}
                      max={1}
                      onSet={e => this.handleLevelChange(e)}
                      value={this.props.level || 1}
          />
      </Container>
    );
  }
}

OutputGain.propTypes = {
  gain: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  setOutputLevel: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    gain: state.audio.gain.output,
    level: state.audio.gain.outputLevel
  };
};

export default connect(mapStateToProps, {setOutputLevel})(OutputGain);
