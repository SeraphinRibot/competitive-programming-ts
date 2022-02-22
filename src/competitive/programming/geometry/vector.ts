import { Coord } from "./coord";

const toRadians = (radians: number) => {
  return radians * (180 / Math.PI);
};

const toDegrees = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

export class Vector {
  x: number;
  y: number;

  /**
   * Used in the equals method in order to consider two double are "equals"
   */
  COMPARISON_TOLERANCE = 0.0000001;

  /**
   * Constructor from two double
   * @param x
   * 	the x value of the vector
   * @param y
   *  the y value of the vector
   */
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Add to this vector the given vector
   * @param other
   * @return
   * 	a new instance of vector sum of this and the given vector
   */
  add(other: Vector) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  /**
   * Negates this vector. The vector has the same magnitude as before, but its direction is now opposite.
   *
   * @return a new vector instance with both x and y negated
   */
  negate() {
    return new Vector(-this.x, -this.y);
  }

  /**
   * Return a new instance of vector rotated from the given number of degrees.
   * @param degree
   * 		the number of degrees to rotate
   * @return
   * 		a new instance rotated
   */
  rotateInDegree(degree: number) {
    return this.rotateInRadian(toRadians(degree));
  }

  /**
   * Return a new instance of vector rotated from the given number of radians.
   * @param radians
   * the number of radians to rotate
   * @return
   * a new instance rotated
   */
  rotateInRadian(radians: number) {
    const length = this.length();
    const angle = this.angleInRadian() + radians;

    const result = new Vector(Math.cos(angle), Math.sin(angle));
    return result.multiply(length);
  }

  /**
   * @return
   * 	the angle between this vector and the vector (1,0) in degrees
   */
  angleInDegree() {
    return toDegrees(this.angleInRadian());
  }

  /**
   * @return
   * 	the angle between this vector and the vector (1,0) in radians
   */
  angleInRadian() {
    return Math.atan2(this.y, this.x);
  }

  /**
   * dot product operator
   * two vectors that are perpendicular have a dot product of 0
   * @param other
   * 		the other vector of the dot product
   * @return
   * 		the dot product
   */
  dot(other: Vector) {
    return this.x * other.x + this.y * other.y;
  }

  equals(other: Vector) {
    if (
      Math.abs(this.x - other.x) > this.COMPARISON_TOLERANCE ||
      Math.abs(this.y - other.y) > this.COMPARISON_TOLERANCE
    ) {
      return false;
    }

    return true;
  }

  /**
   * @return the length of the vector
   * Hint: prefer length2 to perform length comparisons
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * @return the square of the length of the vector
   */
  length2() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Return the vector resulting in this vector minus the values of the other vector
   * @param other
   * the instance to substract from this
   * @return
   *
   * a new instance of vector result of the minus operation.
   */
  minus(other: Vector) {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  /**
   * multiplication operator
   * @param factor
   * the double coefficient to multiply the vector with
   * @return
   * return a new instance multiplied by the given factor
   */
  multiply(factor: number) {
    return new Vector(this.x * factor, this.y * factor);
  }

  /**
   * @return
   * the new instance normalized from this. A normalized instance has a length of 1
   * If the length of this is 0 returns a (0,0) vector
   */
  norm() {
    const length = this.length();

    if (length > 0) return new Vector(this.x / length, this.y / length);

    return new Vector(0, 0);
  }

  /**
   * Returns the orthogonal vector (-y,x).
   * @return
   *  a new instance of vector perpendicular to this
   */
  ortho() {
    return new Vector(-this.y, this.x);
  }

  toString() {
    return "[x=" + this.x + ", y=" + this.y + "]";
  }
}
