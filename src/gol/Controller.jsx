import React, { Component } from 'react';
import GolGrid from './Grid';
import GolButtons from './Buttons';
import GolSettings from './Settings';
import { getPopulation, GOL_RANDOM, compare } from './Utils';

class GolController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 401,
      height: 401,
      cols: 20,
      rows: 20,
      grid: getPopulation(20, 20),
      run: false,
      delay: false,
      size: 2,
      noMoreMoves: false,
      generation: 0,
    };

    this.handleReset = this.handleReset.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleRun = this.handleRun.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
    this.handleGridClick = this.handleGridClick.bind(this);
    this.handleDelay = this.handleDelay.bind(this);
    this.handleSize = this.handleSize.bind(this);
  }

  componentWillMount() {
    const width =
      window.innerWidth > 610 ? 601 : window.innerWidth - ((window.innerWidth - 10) % 50) - 9;
    this.setState({ height: width, width });
  }

  componentDidMount() {
    this.handleRandom();
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
    if (this.state.noMoreMoves) {
      return;
    }
    this.setState((prevState) => {
      const nextGen = getPopulation(prevState.rows, prevState.cols, prevState.grid);
      const noMoreMoves = compare(nextGen, prevState.grid);
      return {
        grid: nextGen,
        noMoreMoves,
        run: noMoreMoves ? false : prevState.run,
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

  handleGridClick(e) {
    const { width, height, cols, rows } = this.state;
    const colIndex = Math.floor(cols - ((width - e.nativeEvent.offsetX) / (width / cols)));
    const rowIndex = Math.floor(rows - ((height - e.nativeEvent.offsetY) / (height / rows)));
    const gridIndex = colIndex + (rowIndex * cols);
    this.setState((prevState) => {
      const newGrid = prevState.grid.slice(0);
      newGrid[gridIndex] = prevState.grid[gridIndex] ? 0 : 1;
      return {
        grid: newGrid,
        generation: prevState.generation === 0 ? 1 : prevState.generation,
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
    const { generation, noMoreMoves, delay, run, size } = this.state;

    return (
      <div className="grid-content">

        <GolButtons
          handleRun={this.handleRun}
          handleNext={this.handleNext}
          handleStop={this.handleStop}
          handleReset={this.handleReset}
          handleRandom={this.handleRandom}
        />

        <h4>Generation {generation} {noMoreMoves ? ' (No more moves)' : ''}</h4>

        <div>
          <span onClick={this.handleGridClick} role="presentation">
            <GolGrid {...this.state} />
          </span>
        </div>

        <GolSettings
          handleDelay={this.handleDelay}
          handleSize={this.handleSize}
          delay={delay}
          run={run}
          size={size}
        />
      </div>
    );
  }
}

export default GolController;
