class CSGUnion extends CSGTree {
    constructor(left, right) {
        super(left, right);
    }
    
    hasPoint(point) {
        return this.left.hasPoint(point) || this.right.hasPoint(point);
    }
}