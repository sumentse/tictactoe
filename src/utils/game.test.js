import { mapTilePosition } from "./game";

test("should show correct mappings", () => {
  const map = mapTilePosition(3, 3);
  expect(map.size).toBe(9);
  expect(map.get(0)).toMatchObject({ row: 0, col: 0 });
  expect(map.get(8)).toMatchObject({ row: 2, col: 2 });
});
