import React from 'react';
import {connect} from 'react-redux';
import Key from './Key';
import {keyUp, keyDown} from '../actions';

const Keyboard = ({keys, keyDown, keyUp}) => {
  return (
    <div>
      {keys.map((k, i) => <Key key={i} value={k} keyDown={keyDown} keyUp={keyUp}/>)}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    keys: state.keys
  };
};

export default connect(mapStateToProps, {keyDown, keyUp})(Keyboard);
