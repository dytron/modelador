class HalfEdge extends BRepNode {
    constructor(where) {
        super();
        this.edge = null;
        this.vertex = null;
        this.loop = null;
        this.prev = null;
        this.next = this;
        if (where) {
            this.addList(where);
        }
    }
    addList(where) {
        this.addNext(where.halfEdge);
        if (!this.prev)
            this.prev = this;
        where.halfEdge = this;
        this.loop = where;
    }
    add(edge, vtx, sign) {
        let halfEdge;
        if (this.edge == null) {
            halfEdge = this;
        } else {
            halfEdge = new HalfEdge();
            console.log("Creating new halfEdge:", halfEdge);
            console.log("Connecting existing halfEdge to new halfEdge:", this.prev, "->", halfEdge);
            this.prev.next = halfEdge;
            halfEdge.prev = this.prev;
            this.prev = halfEdge;
            halfEdge.next = this;
        }
        halfEdge.edge = edge;
        halfEdge.vertex = vtx;
        halfEdge.loop = this.loop;
        if (sign > 0) {
            console.log("Setting edge.halfEdge1 to:", halfEdge);
            edge.halfEdge1 = halfEdge;
        } else {
            console.log("Setting edge.halfEdge2 to:", halfEdge);
            edge.halfEdge2 = halfEdge;
        }
        console.log("Resulting halfEdge:", halfEdge);
        return halfEdge;
    }
    del() {
        if (this.edge == null) {
            return null;
        }
        if (this.next == this) {
            this.edge = null;
            return this;
        }
        this.prev.next = this.next;
        this.next.prev = this.prev;
        return this.prev;
    }
}