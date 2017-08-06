import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EffectBank from './components/EffectBank';
import OutputGain from './components/OutputGain';
import Stream from './components/Stream';
import ToneBank from './components/ToneBank';
import { inputTypes } from '../../utils/input';
import { selectors as appSelectors } from '../App';

class Audio extends React.PureComponent {
  constructor(props) {
    super(props);

    this.inputGain = this.props.context.createGain();
    this.outputGain = this.props.context.createGain();
    this.outputGain.connect(this.props.context.destination);
  }

  render() {
    return (
      <div>
        {this.props.input && this.props.input.device === inputTypes.stream
          ? <Stream context={this.props.context} output={this.inputGain} />
          : <ToneBank output={this.inputGain} />}
        <EffectBank inputGain={this.inputGain} outputGain={this.outputGain} />
        <OutputGain gain={this.outputGain} />
      </div>
    );
  }
}

Audio.propTypes = {
  context: PropTypes.object.isRequired,
  input: PropTypes.object
};

const mapStateToProps = state => ({
  context: appSelectors.getContext(state)
});

export default connect(mapStateToProps)(Audio);
