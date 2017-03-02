import React, {PropTypes} from 'react';
import Button from '../../../../components/Button';
import {defaultSettings} from '../Effects';
const styles = require('./styles.css');

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
      <div className={styles.wrapper}>
        <Button active text="Add Effect" click={this.toggleOpen}/>
        {this.state.open && (<div className={styles.buttonList}>
          {effectList}
        </div>)}
      </div>
    );
  }
}

AddEffect.propTypes = {
  add: PropTypes.func.isRequired
};

export default AddEffect;
