export default class Vector {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  increase (vector) {
    if(vector instanceof Vector) {
      this.x += vector.x;
      this.y += vector.y;
    }

    return this;
  }
}
