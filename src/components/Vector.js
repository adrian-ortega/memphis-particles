export default class Vector {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param {Vector} vector
   */
  increase (vector) {
    if(vector && vector instanceof Vector) {
      this.x += vector.x;
      this.y += vector.y;
    }
  }

  decrease (vector) {
    if(vector && vector instanceof Vector) {
      this.x -= vector.x;
      this.y -= vector.y;
    }
  }
}
