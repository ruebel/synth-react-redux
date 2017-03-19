import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import EffectBank from './components/EffectBank';
import OutputGain from './components/OutputGain';
import Arpeggiator from './components/Arpeggiator';
// import ToneBank from './components/ToneBank';
import {selectors as appSelectors} from '../App';

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
        <Arpeggiator
          output={this.inputGain}/>
        {/* <ToneBank
          output={this.inputGain}/> */}
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
  context: appSelectors.getContext(state)
});

export default connect(mapStateToProps, null)(Audio);
