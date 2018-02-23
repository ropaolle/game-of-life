import React from 'react';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import StopIcon from 'material-ui-icons/Stop';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import ShuffleIcon from 'material-ui-icons/Shuffle';
import DeleteIcon from 'material-ui-icons/Delete';


const ButtonList = (props) => {
  const button = (label, tooltip, onclick, icon, color = 'default') =>
    (<Tooltip title={tooltip}>
      <IconButton color={color} onClick={onclick} aria-label={label}>
        {icon}
      </IconButton>
    </Tooltip>);

  return (
    <div>
      {button('Play', 'Play', props.handleRun, <PlayArrowIcon />)}
      {button('Step', 'Next generation', props.handleNext, <SkipNextIcon />)}
      {button('Stop', 'Stop', props.handleStop, <StopIcon />)}
      {button('Clear', 'Reset generation', props.handleReset, <DeleteIcon />)}
      {button('Shuffle', 'Create reandom generation', props.handleRandom, <ShuffleIcon />)}
    </div>
  );
};

export default ButtonList;
