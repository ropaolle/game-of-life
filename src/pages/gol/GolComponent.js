import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

export function drawGrid(ctx, cols, rows, clearCanvas = true, gridColor = '#DDDDDD', bgColor = '#FFFFFF') {
  if (clearCanvas) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  const w = Math.floor(ctx.canvas.width / cols);
  const h = Math.floor(ctx.canvas.height / rows);

  ctx.beginPath();
  for (let x = 0.5; x < ctx.canvas.width; x += w) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, ctx.canvas.width);
  }
  for (let y = 0.5; y < ctx.canvas.height; y += h) {
    ctx.moveTo(0, y);
    ctx.lineTo(ctx.canvas.height, y);
  }
  ctx.strokeStyle = gridColor;
  ctx.stroke();
}

export function drawPopulation(ctx, population, cols, rows, cellColor = '#FF0000', bgColor = '#FFFFFF') {
  const w = Math.floor(ctx.canvas.width / cols);
  const h = Math.floor(ctx.canvas.height / rows);

  population.forEach((val, i) => {
    const colIndex = i % cols;
    const rowIndex = Math.floor(i / cols);
    if (val === 1) {
      ctx.fillStyle = cellColor;
      ctx.fillRect((colIndex * w) + 1, (rowIndex * h) + 1, w - 1, h - 1);
    } if (val === 0) {
      ctx.fillStyle = bgColor;
      ctx.fillRect((colIndex * w) + 1, (rowIndex * h) + 1, w - 1, h - 1);
    }
  });
}

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 0,
  },
});

class GolGrid extends Component {
  componentDidMount() {
    const ctx = this.canvas.getContext('2d');
    const { cols, rows, gridColor, bgColor } = this.props;
    drawGrid(ctx, cols, rows, true, gridColor, bgColor);
  }

  componentDidUpdate(prevProps) {
    const ctx = this.canvas.getContext('2d');
    const { grid, cols, rows, width, cellColor, bgColor, gridColor } = this.props;
    // Set all unchanged cells to -1. drawPopulation only draws cells with a value of 0 or 1.
    const gridDiff = grid.map((val, i) => ((val === prevProps.grid[i]) ? -1 : val));

    if (cols !== prevProps.cols || rows !== prevProps.rows || width !== prevProps.width) {
      drawGrid(ctx, cols, rows, true, gridColor, bgColor);
    } else {
      drawPopulation(ctx, gridDiff, cols, rows, cellColor, bgColor);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <canvas
        className={classes.root}
        ref={(c) => { this.canvas = c; }}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

GolGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  grid: PropTypes.arrayOf(PropTypes.number),
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  cellColor: PropTypes.string,
  bgColor: PropTypes.string,
  gridColor: PropTypes.string,
};

GolGrid.defaultProps = {
  grid: [],
  cellColor: '#00CC00',
  bgColor: '#FFFFFF',
  gridColor: '#DDDDDD',
};

export default withStyles(styles)(GolGrid);
