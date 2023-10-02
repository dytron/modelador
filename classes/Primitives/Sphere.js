class Sphere extends Primitive {
    constructor(radius) {
        super();
        this.center = new Point(0, 0, 0);
        this.radius = radius;
        this.type = "sphere";
        this.process();
    }
    hasPoint(p) {
        return this.center.sub(p).magnitude() <= this.radius;
    }
    getMaxRadius() {
        return this.radius;
    }
    draw() {
        super.draw();
        push();
        translate(this.center.x, this.center.y, this.center.z);
        sphere(this.radius);
        pop();
    }
    calculateVolume() {
        return 4 * Math.PI * (this.radius ** 3 ) / 3;
    }
}