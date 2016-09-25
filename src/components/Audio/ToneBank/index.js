import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Tone from './Tone';

const ToneBank = ({tones, context, output, settings}) => {
  return (
    <div>
      {Object.keys(tones).map((k, i) => {
        return (
          <Tone key={i}
                tone={tones[k]}
                context={context}
                output={output}
                settings={settings}/>);
        })}
    </div>
  );
};

ToneBank.propTypes = {
  context: PropTypes.object.isRequired,
  output: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  tones: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    tones: state.audio.keys,
    context: state.audio.context,
    output: state.audio.gainStage,
    settings: state.synth
  };
};

export default connect(mapStateToProps)(ToneBank);
