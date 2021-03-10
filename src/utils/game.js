// Utility for helping with game related functionality

// Reference the index for 2d array if it was flat
const mapTilePosition = (rows = 3, cols = 3) => {
  let map = new Map();
  for (let i = 0; i < rows * cols; i++) {
    let row = Math.floor(i / rows);
    let col = i % cols;
    map.set(i, { row, col });
  }

  return map;
};

export { mapTilePosition };
