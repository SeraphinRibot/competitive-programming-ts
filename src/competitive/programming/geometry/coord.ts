export class Coord {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Add this coord instance to another one to return the sum of the coords
   *
   * @param coord the other coord to add
   * @return a new instance with coordinate as the sum of this and the given
   *         coord
   */
  add(coord: Coord): Coord {
    return new Coord(this.x + coord.x, this.y + coord.y);
  }

  /**
   * Substract to the instance x and y the values of the given coord
   *
   * @param coord the other coord to substract
   * @return a new instance with coordinate as the substraction of this and
   *         the given coord
   */
  minus(coord: Coord) {
    return new Coord(this.x - coord.x, this.y - coord.y);
  }

  /**
   * return the euclidian distance between two coords
   *
   * @return sqrt(dx*dx+dy*dy)
   */
  distanceSquare(coord: Coord): number {
    return Math.sqrt(this.distanceSquare(coord));
  }

  /**
   * return the euclidian distance square between two coords
   *
   * Hint : prefer this square distance if you want to compare distances
   * rather than the exact distance that cost more
   *
   * @return dx*dx+dy*dy
   */
  distance(coord: Coord): number {
    const dx = coord.x - this.x;
    const dy = coord.y - this.y;

    return dx * dx + dy * dy;
  }

  distanceTo(coord: Coord): number {
    return Math.abs(this.x - coord.x) + Math.abs(this.y - coord.y);
  }

  equals(coord: Coord): boolean {
    return this.x === coord.x && this.y === coord.y;
  }

  toString() {
    return "[x=" + this.x + ", y=" + this.y + "]";
  }
}
