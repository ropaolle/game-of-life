import React, { Component } from 'react';
import PropTypes from 'prop-types';

const CELL_COLOR = '#00CC00';
const BG_COLOR = '#FFFFFF';
const GRID_COLOR = '#DDDDDD';

export function drawGrid(ctx, cols, rows, clearCanvas = true) {
  if (!ctx) return;

  if (clearCanvas) {
    ctx.fillStyle = BG_COLOR;
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
  ctx.strokeStyle = GRID_COLOR;
  ctx.stroke();
}

export function drawPopulation(ctx, population, cols, rows) {
  if (!ctx) return;

  const w = Math.floor(ctx.canvas.width / cols);
  const h = Math.floor(ctx.canvas.height / rows);

  population.forEach((val, i) => {
    if (val < 0) return;

    ctx.fillStyle = (val === 0) ? BG_COLOR : CELL_COLOR;

    const colIndex = i % cols;
    const rowIndex = Math.floor(i / cols);
    ctx.fillRect((colIndex * w) + 1, (rowIndex * h) + 1, w - 1, h - 1);
  });
}

class GolGrid extends Component {
  componentDidMount() {
    const ctx = this.canvas.getContext('2d');
    const { cols, rows } = this.props;
    drawGrid(ctx, cols, rows, true);
  }

  componentDidUpdate(prevProps) {
    const ctx = this.canvas.getContext('2d');
    const { grid, cols, rows, width } = this.props;

    // Set all unchanged cells to -1. drawPopulation only draws cells with a value of 0 or 1.
    const gridDiff = grid.map((val, i) => ((val === prevProps.grid[i]) ? -1 : val));

    if (cols !== prevProps.cols || rows !== prevProps.rows || width !== prevProps.width) {
      drawGrid(ctx, cols, rows, true);
    } else {
      drawPopulation(ctx, gridDiff, cols, rows);
    }
  }

  render() {
    return (
      <canvas
        ref={(c) => { this.canvas = c; }}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

GolGrid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.number),
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
};

GolGrid.defaultProps = {
  grid: [],
};

export default GolGrid;
