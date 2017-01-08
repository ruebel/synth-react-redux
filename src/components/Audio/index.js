import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import EffectBank from './EffectBank';
import OutputGain from './OutputGain';
import ToneBank from './ToneBank';

class Audio extends React.Component {
  constructor(props) {
    super(props);

    this.inputGain = this.props.context.createGain();
    this.outputGain = this.props.context.createGain();
    this.outputGain.connect(this.props.context.destination);
  }

  render() {
    return (
      <div>
        <ToneBank
          output={this.inputGain}/>
        <EffectBank
          inputGain={this.inputGain}
          outputGain={this.outputGain}/>
        <OutputGain
          gain={this.outputGain}/>
      </div>
    );
  }
}

Audio.propTypes = {
  context: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  context: state.context
});

export default connect(mapStateToProps, null)(Audio);
