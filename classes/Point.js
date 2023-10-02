class Point {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
    add(p) {
      return new Point(this.x + p.x, this.y + p.y, this.z + p.z);
    }
    sub(p) {
      return new Point(this.x - p.x, this.y - p.y, this.z - p.z);
    }
    mul(k) {
      return new Point(this.x * k, this.y * k, this.z * k);
    }
    div(k) {
      return new Point(this.x / k, this.y / k, this.z / k);
    }
    magnitude() {
      return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    }
    normalize() {
      return this.divide(this.magnitude());
    }
    cross(p) {
        return new Point(
            this.y * p.z - this.z * p.y,
            this.z * p.x - this.x * p.z,
            this.x * p.y - this.y * p.x
        );
    }
    setFromArray(array) {
      this.x = array[0];
      this.y = array[1];
      this.z = array[2];
    }
    toArray() {
      return [this.x, this.y, this.z, 1];
    }
  }
  