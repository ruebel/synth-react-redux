import React from 'react';
import {connect} from 'react-redux';
import Key from './Key';
import {keyDown, keyUp} from '../actions/audio';

const Keyboard = ({keys, keyDown, keyUp}) => {
  return (
    <div>
      {Object.keys(keys).map((k, i) => {
        return (
          <Key key={i}
               tone={keys[k]}
               keyDown={keyDown}
               keyUp={keyUp}/>);
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    keys: state.audio.keys
  };
};

export default connect(mapStateToProps, {keyDown, keyUp})(Keyboard);
