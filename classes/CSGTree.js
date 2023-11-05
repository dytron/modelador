class CSGTree extends Primitive {
    constructor(left, right) {
        super();
        this.strokeWeight = 0.5;
        this.type = "csgtree";
        this.left = left;
        this.right = right;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    hasPoint(point) {
        for (const child of this.children) {
            if (!child.hasPoint(point)) return false;
        }
        return true;
    }
    setLeft(left) {
        this.left = left;
        return this;
    }
    setRight(right) {
        this.right = right;
        return this;
    }
    drawChildren() {
        // Só funciona corretamente com Union (e Fill ativado)
        if (this.left) {
            this.left.selected = this.selected;
            this.left.draw();
        }
        if (this.right) {
            this.right.selected = this.selected;
            this.right.draw();
        }
    }
    getMaxRadius() {
        return 200;
    }
    draw() {
        super.draw();
        this.drawChildren();
    }
}