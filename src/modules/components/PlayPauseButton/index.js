import React, {PropTypes} from 'react';
import Pause from '../icons/Pause';
import Play from '../icons/Play';

const PlayPauseButton = ({click, play}) => {
  return play ? <Pause click={click}/> : <Play click={click}/>;
};

PlayPauseButton.propTypes = {
  click: PropTypes.func.isRequired,
  play: PropTypes.bool
};

export default PlayPauseButton;
