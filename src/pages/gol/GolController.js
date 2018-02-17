import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import StopIcon from 'material-ui-icons/Stop';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import ShuffleIcon from 'material-ui-icons/Shuffle';
import DeleteIcon from 'material-ui-icons/Delete';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormControl, FormGroup } from 'material-ui/Form';
import Select from 'material-ui/Select';
import GolComponent from './GolComponent';
import { getPopulation, GOL_RANDOM, compare } from './GolUtils';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit / 2,
  },
  content: {
    textAlign: 'center',
  },
  grid: {
    overflow: 'overlay',
  },
  gridWrapper: {
    display: 'inline-block',
  },
  formGroup: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class GolController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 401,
      height: 401,
      cols: 10,
      rows: 10,
      grid: getPopulation(10, 10),
      run: false,
      delay: true,
      size: 0,
      noMoreMoves: false,
      generation: 0,
    };
    this.handleReset = this.handleReset.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleRun = this.handleRun.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelay = this.handleDelay.bind(this);
    this.handleSize = this.handleSize.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    const { delay, run } = this.state;
    if (nextState.run !== run) {
      if (!nextState.noMoreMOves && nextState.run) {
        this.timer = setInterval(this.handleNext, delay ? 250 : 0);
      } else {
        clearInterval(this.timer);
      }
    }
  }

  handleReset() {
    this.setState(prevState => ({
      grid: getPopulation(prevState.rows, prevState.cols),
      noMoreMoves: false,
      run: false,
      generation: 0,
    }));
  }

  handleNext() {
    if (this.state.noMoreMoves) { return; }
    this.setState((prevState) => {
      const nextGen = getPopulation(prevState.rows, prevState.cols, prevState.grid);
      const noMoreMoves = compare(nextGen, prevState.grid);
      return {
        grid: nextGen,
        noMoreMoves,
        run: (noMoreMoves) ? false : prevState.run,
        generation: prevState.generation + 1,
      };
    });
  }

  handleRun() {
    this.setState({ run: !this.state.noMoreMoves });
  }

  handleStop() {
    this.setState({ run: false });
  }

  handleSize(event) {
    const size = event.target.value;
    this.handleReset();
    this.setState({
      cols: size * 10,
      rows: size * 10,
      size,
    });
  }

  handleRandom() {
    const { cols, rows } = this.state;
    const nextGen = getPopulation(rows, cols, [], GOL_RANDOM);
    if (nextGen.length) {
      this.setState({
        grid: nextGen,
        noMoreMoves: false,
        run: false,
        generation: 1,
      });
    }
  }

  handleClick(e) {
    const { width, height, cols, rows } = this.state;
    const colIndex = Math.floor(cols - ((width - e.nativeEvent.offsetX) / (width / cols)));
    const rowIndex = Math.floor(rows - ((height - e.nativeEvent.offsetY) / (height / rows)));
    const gridIndex = colIndex + (rowIndex * cols);
    this.setState((prevState) => {
      const newGrid = prevState.grid.slice(0); // Clone array
      newGrid[gridIndex] = (prevState.grid[gridIndex]) ? 0 : 1;
      return {
        grid: newGrid,
        generation: (prevState.generation === 0) ? 1 : prevState.generation,
      };
    });
  }

  handleDelay(checked) {
    const { run, noMoreMOves } = this.state;
    if (run && !noMoreMOves) {
      clearInterval(this.timer);
      this.timer = setInterval(this.handleNext, checked ? 250 : 0);
    }
    this.setState({ delay: checked });
  }

  render() {
    const { generation, noMoreMoves } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <div>
          <Tooltip title="Play">
            <IconButton color="primary" className={classes.button} onClick={this.handleRun} aria-label="Play"><PlayArrowIcon /></IconButton>
          </Tooltip>
          <Tooltip title="Next generation">
            <IconButton className={classes.button} onClick={this.handleNext} aria-label="Step"><SkipNextIcon /></IconButton>
          </Tooltip>
          <Tooltip title="Stop">
            <IconButton className={classes.button} onClick={this.handleStop} aria-label="Stop"><StopIcon /></IconButton>
          </Tooltip>
          <Tooltip title="Reset generation">
            <IconButton className={classes.button} onClick={this.handleReset} aria-label="Clear"><DeleteIcon /></IconButton>
          </Tooltip>
          <Tooltip title="Create reandom generation">
            <IconButton color="primary" className={classes.button} onClick={this.handleRandom} aria-label="Shuffle"><ShuffleIcon /></IconButton>
          </Tooltip>
        </div>
        <Typography type="body1" gutterBottom>Generation {generation} {noMoreMoves ? ' (No more moves)' : ''}</Typography>
        <div className={classes.grid}>
          <span
            className={classes.gridWrapper}
            onClick={this.handleClick}
            role="presentation"
          >
            <GolComponent {...this.state} />
          </span>
        </div>
        <FormGroup row className={classes.formGroup}>
          <FormControl>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={this.state.delay}
                  onChange={(event, checked) => this.handleDelay(checked)}
                />
              }
              label={(this.state.delay) ? 'Use delay' : 'Full speed'}
            />
          </FormControl>
          <FormControl>
            <Select
              native
              disabled={this.state.run}
              value={this.state.size}
              onChange={this.handleSize}
              className={classes.selectEmpty}
            >
              <option value={1}>10 x 10</option>
              <option value={2}>20 x 20</option>
              <option value={5}>50 x 50</option>
              <option value={10}>100 x 100</option>
              <option value={20}>200 x 200</option>
            </Select>
          </FormControl>
        </FormGroup>
      </div>
    );
  }
}

GolController.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GolController);
