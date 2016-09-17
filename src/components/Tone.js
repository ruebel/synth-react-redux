import React, {Component} from 'react';
import Context from './Context';

class Tone extends Component {
  render () {
    return (<div>
      <Context>
        {({createOscillator}) => {
          createOscillator(this.props.freq);
          return (
            <div>
              {this.props.freq}
            </div>);
        }}
      </Context>
    </div>);
  }
}

export default Tone;
