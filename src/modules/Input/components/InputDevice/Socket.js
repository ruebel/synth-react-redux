import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {socketMessage} from '../../actions';
import {getSocketSettings, getSocketStatus} from '../../selectors';

class Socket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null
    };

    this.handleSocketMessage = this.handleSocketMessage.bind(this);
    this.startSocket = this.startSocket.bind(this);
    this.stopSocket = this.stopSocket.bind(this);
  }

  componentDidMount() {
    if (this.props.status) {
      this.startSocket(this.props.settings);
    }
  }

  componentWillReceiveProps(next) {
    if (next.settings.url !== this.props.settings.url) {
      this.startSocket(next.settings);
    } if (next.status !== this.props.status) {
      if (next.status) {
        this.startSocket(next.settings);
      } else {
        this.stopSocket();
      }
    }
  }

  componentWillUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.stopSocket();
  }

  handleSocketMessage({data}) {
    const message = JSON.parse(data);
    this.props.socketMessage(message);
  }

  startSocket(settings) {
    this.stopSocket();
    const socket = new WebSocket(settings.url);
    socket.onmessage = this.handleSocketMessage;
    this.setState({
      socket
    });
  }

  stopSocket() {
    if (this.state.socket) {
      this.state.socket.close();
    }
  }

  render() {
    return null;
  }
}

Socket.propTypes = {
  settings: PropTypes.object.isRequired,
  socketMessage: PropTypes.func.isRequired,
  status: PropTypes.bool
};

const mapStateToProps = (state) => ({
  settings: getSocketSettings(state),
  status: getSocketStatus(state)
});

export default connect(mapStateToProps, {socketMessage})(Socket);
