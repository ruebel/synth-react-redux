import React from 'react';
import {connect} from 'react-redux';
import Key from './Key';
import {keyDown, keyUp} from '../actions/audio';

const Keyboard = ({keys, context, output, settings, keyDown, keyUp}) => {
  return (
    <div>
      {Object.keys(keys).map((k, i) => {
        return (
          <Key key={i}
               tone={keys[k]}
               keyDown={keyDown}
               keyUp={keyUp}
               context={context}
               output={output}
               settings={settings}/>);
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    keys: state.audio.keys,
    context: state.audio.context,
    output: state.audio.context.destination,
    settings: state.synth
  };
};

export default connect(mapStateToProps, {keyDown, keyUp})(Keyboard);
