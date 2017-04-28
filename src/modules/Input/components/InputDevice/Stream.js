import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {setStream} from '../../actions';
import {selectors as appSelectors} from '../../../App';

class Stream extends React.Component {
  componentDidMount() {
    navigator.mediaDevices.getUserMedia({audio: true})
    .then((stream) => {
      const source = this.props.context.createMediaStreamSource(stream);
      this.props.setStream(source);
    });
  }

  componentWillUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.props.setStream(null);
  }

  render() {
    return null;
  }
}

Stream.propTypes = {
  context: PropTypes.object.isRequired,
  setStream: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  context: appSelectors.getContext(state)
});

export default connect(mapStateToProps, {setStream})(Stream);
