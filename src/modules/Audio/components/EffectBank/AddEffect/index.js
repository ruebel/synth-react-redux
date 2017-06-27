import React, {PropTypes} from 'react';
import styled from 'styled-components';
import Button from '../../../../components/Button';
import {defaultSettings} from '../Effects';

const ButtonList = styled.div`
  background: ${p => p.theme.color.graySemidark};
  border: 5px solid ${p => p.theme.color.graySemidark};
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-start;

  & > button {
    flex: 1;
  }

  & > button:not(:first-of-type) {
    margin-left: 5px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > button {
    margin: 5px 10px 5px 0;;
  }
`;

class AddEffect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  handleAdd(effect) {
    this.toggleOpen();
    this.props.add(effect);
  }

  toggleOpen() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const effectList = Object.keys(defaultSettings).map((k, i) => {
      const effect = defaultSettings[k];
      return <Button key={i} active color={effect.color} text={effect.title} click={() => this.handleAdd(k)}/>;
    });
    return (
      <Wrapper>
        <Button active text="Add Effect" click={this.toggleOpen}/>
        {this.state.open && (
          <ButtonList>
            {effectList}
          </ButtonList>
        )}
      </Wrapper>
    );
  }
}

AddEffect.propTypes = {
  add: PropTypes.func.isRequired
};

export default AddEffect;
