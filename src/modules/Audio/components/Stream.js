import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Stream extends React.Component {
  componentWillReceiveProps(next) {
    if (next.stream && next.stream !== this.props.stream) {
      next.stream.connect(next.output);
    }
  }

  componentWillUnmount() {
    if (this.props.stream) {
      this.props.stream.disconnect();
    }
  }

  render() {
    return null;
  }
}

Stream.propTypes = {
  output: PropTypes.object.isRequired,
  stream: PropTypes.object
};

const mapStateToProps = state => ({
  stream: state.input.stream
});

export default connect(mapStateToProps)(Stream);
