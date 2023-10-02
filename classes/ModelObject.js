class ModelObject extends Primitive {
    constructor(path) {
        super();
        this.model = loadModel(path, true);
        this.fill = color(195, 25, 25);
        this.strokeWeight = 0.5;
        this.type = "model";
    }
    setName(name) {
        this.name = name;
        return this;
    }
    draw() {
        super.draw();
        model(this.model);
    }
}