import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from '../../../components/Container';
import RangeControl from '../../../components/RangeControl';
import { setOutputLevel } from '../../actions';
import { getOutputLevel } from '../../selectors';

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
      this.props.gain.gain.setTargetAtTime(
        next.level,
        next.context.currentTime + 0.01,
        0.2
      );
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
  context: PropTypes.object.isRequired,
  gain: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  setOutputLevel: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  level: getOutputLevel(state)
});

export default connect(mapStateToProps, { setOutputLevel })(OutputGain);
