class Solid extends BRepNode {
    constructor(where) {
        super();
        this.id = null;
        this.faces = null;
        this.edges = null;
        this.vertex = null;
        this.next = null;
        this.prev = null;
        this.faceID = 0;
        this.vertexID = 0;
        this.addList(where);
        this.normals = [];
    }
    calculateNormals() {
        let halfEdge;
        let loop;
        let face = this.faces;
        while (face) {
            loop = face.loops;
            while (loop) {
                halfEdge = loop.halfEdge;
                let v1 = halfEdge.vertex;
                let v2 = halfEdge.next.vertex;
                let v3 = halfEdge.next.next.vertex;
                let A = v2.point.sub(v1.point);
                let B = v3.point.sub(v1.point);
                this.normals.push(A.cross(B));
                loop = loop.next;
            }
            face = face.next;
        }
    }
    addList() {
        this.addNext(Node.firstSolid);
        Node.firstSolid = this;
    }
    print() {
        this.forEach((face)=>{
            console.log(`Face ${face.id}`);
        },()=>{
            console.log("Loop");
        },(vtx)=>{
            console.log(`v${vtx.id}: (${vtx.point.x}, ${vtx.point.y}, ${vtx.point.z})`);
        },()=>{
            console.log("");
        });
    }
    draw() {
        if (!this.normals.length) {
            this.calculateNormals();
        }
        let i = 0;
        this.forEach((face)=>{},()=>{
            let N = this.normals[i++];
            normal(N.x, N.y, N.z);
            beginShape();
        },(vtx)=>{
            vertex(vtx.point.x, vtx.point.y, vtx.point.z);
        },()=>{
            endShape(CLOSE);
        });
    }
    forEach(faceFunction, loopFunction, vertexFunction, loopEnd) {
        let halfEdge;
        let loop;
        let face = this.faces;
        let vtx;
        while (face) {
            faceFunction(face);
            loop = face.loops;
            while (loop) {
                loopFunction();
                halfEdge = loop.halfEdge;
                do {
                    vtx = halfEdge.vertex;
                    vertexFunction(vtx);
                    halfEdge = halfEdge.next;
                } while (halfEdge != loop.halfEdge);
                loopEnd();
                loop = loop.next;
            }
            face = face.next;
        }
    }
}