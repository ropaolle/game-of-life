/**
 * Game of Life rules checker
 * Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
 * Any live cell with two or three live neighbours lives on to the next generation.
 * Any live cell with more than three live neighbours dies, as if by overpopulation.
 * Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
function getNextCellGeneration(currentCell, aliveNeighbors) {
  if (currentCell) {
    return (aliveNeighbors === 2 || aliveNeighbors === 3) ? 1 : 0;
  }

  return (aliveNeighbors === 3) ? 1 : 0;
}

/**
 * Neighbour offsets
 * [-1, -1], [0, -1], [1, -1],
 * [-1,  0],   cell   [1,  0],
 * [-1,  1], [0,  1], [1,  1]
 */
const neighbourOffsets = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

/**
 * Get next generation and return the population.
 */
export function getNextGeneration(currentGeneration, rows, cols) {
  return currentGeneration.map((val, i) => {
    // Count alive neighbors
    let aliveNeighbors = 0;
    const colIndex = i % cols;
    const rowIndex = Math.floor(i / cols);
    neighbourOffsets.forEach((offset) => {
      const rowOffset = rowIndex + offset[1];
      const colOffset = colIndex + offset[0];
      // Check that neighbor exists, i.e. is on the grid.
      if (rowOffset > -1 && rowOffset < rows && colOffset > -1 && colOffset < cols) {
        // Check if neighbor is alive.
        if (currentGeneration[colOffset + (rowOffset * cols)]) { aliveNeighbors += 1; }
      }
    });

    // Check Game of Life rules
    return getNextCellGeneration(currentGeneration[i], aliveNeighbors);
  });
}

/**
 * Compare
 * https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript?page=1&tab=votes#tab-top
 */
export function compare(currGen, prevGen) {
  if (!currGen || !prevGen) return false;

  // compare lengths - can save a lot of time
  if (currGen.length !== prevGen.length) return false;

  for (let i = 0, l = currGen.length; i < l; i += 1) {
    if (currGen[i] !== prevGen[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
}

export const GOL_NEXT = 'GOL_NEXT';
export const GOL_RANDOM = 'GOL_RANDOM';
export const GOL_SPINNER = 'GOL_SPINNER';

function getArrayOfZeros(rows, cols) {
  return new Array(rows * cols).fill(0);
}

export function getPopulation(rows, cols, previous = null, type = GOL_NEXT) {
  if (rows && cols) {
    if (type === GOL_RANDOM) {
      const arrayOfZeros = getArrayOfZeros(rows, cols);
      return arrayOfZeros.map(() => Math.round(Math.random()));
    } else if (type === GOL_SPINNER) {
      const x = ((rows * cols) / 2) + (cols / 2);
      const arrayOfZeros = getArrayOfZeros(rows, cols);
      arrayOfZeros[x - cols] = 1;
      arrayOfZeros[x] = 1;
      arrayOfZeros[x + cols] = 1;
      return arrayOfZeros;
    }
    if (previous && previous.length && type === GOL_NEXT) {
      return getNextGeneration(previous, rows, cols);
    }

    return getArrayOfZeros(rows, cols);
  }

  return [];
}
