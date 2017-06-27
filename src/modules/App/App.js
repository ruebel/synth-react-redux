import React, {PropTypes} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {Audio, actions as audioActions} from '../Audio';
import Columns from '../components/Columns';
import {Input, selectors as inputSelectors} from '../Input';
import {Presets} from '../Presets';
import {Synth} from '../Synth';
import {AssignControl} from '../Control';
import {inputTypes} from '../../utils/input';

const Wrapper = styled.div`
  padding: 0 30px;
  max-width: 1480px;
  margin: 0 auto;
`;

const App = ({input, keyDown, keyUp}) => {
  return (
    <Wrapper>
      <Columns>
        <Input />
        <Presets />
      </Columns>
      {input && input.device !== inputTypes.stream && <Synth keyDown={keyDown} keyUp={keyUp}/>}
      <Audio input={input}/>
      <AssignControl />
    </Wrapper>
  );
};

App.propTypes = {
  input: PropTypes.object,
  keyDown: PropTypes.func.isRequired,
  keyUp: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  input: inputSelectors.getSelectedDevice(state)
});

export default connect(mapStateToProps, {
  keyDown: audioActions.keyDown,
  keyUp: audioActions.keyUp
})(App);
